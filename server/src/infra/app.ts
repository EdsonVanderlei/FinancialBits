import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from '../shared/classes/app-error';
import { errorMiddleware } from './middlewares/error.middleware';
import { RouteDefinition } from './types/route-definition';

export class App {
	private port: number;
	private app: express.Express;
	private controllers: Map<string, any>;

	constructor(port: number) {
		this.port = port;
		this.app = express();
		this.controllers = new Map();
		this.setConfigurations();
	}

	private setConfigurations() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	public setController<T extends Object>(
		instance: T,
		middlewares: ((req: Request, res: Response, next: NextFunction) => unknown)[] = []
	) {
		const controller = instance.constructor;
		if (this.controllers.has(controller.name)) {
			throw new AppError(`Duplicate controller: ${controller.name}`, 500);
		}
		this.controllers.set(controller.name, instance);

		const prefix: string = Reflect.get(controller, 'prefix');
		const routes: RouteDefinition[] = Reflect.get(controller, 'routes');

		routes.forEach(route => {
			this.app[route.httpMethod](
				prefix + route.path,
				...middlewares,
				async (req: express.Request, res: express.Response, next: express.NextFunction) => {
					const controllerInstance = this.controllers.get(controller.name);
					const fn = route.methodName as keyof T;

					if (!route.isAsync) {
						return controllerInstance[fn](req, res, next);
					}
					return controllerInstance[fn](req, res, next).catch((err: any) => next(err));
				}
			);
		});
	}

	public listen(callback?: () => void) {
		this.app.use(errorMiddleware);

		this.app.listen(this.port, callback ?? (() => console.log(`Server running at http://localhost:${this.port}`)));
	}
}