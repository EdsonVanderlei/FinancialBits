import { Express, NextFunction, Request, Response } from 'express';
import { RouteDefinition } from './types/route-definition';

export type RouteRequestFn = (req: Request, res: Response, next: NextFunction) => unknown | Promise<unknown>;

export class AppRoute<T extends object> {
	private constructor(
		express: Express,
		private controller: T,
		private middlewares: RouteRequestFn[],
	) {
		const prefix = Reflect.get(this.controller.constructor, 'prefix') as string;
		const routes = Reflect.get(this.controller.constructor, 'routes') as RouteDefinition<T>[];

		routes.forEach(route =>
			express[route.httpMethod](
				prefix + route.path,
				...this.middlewares,
				async (req: Request, res: Response, next: NextFunction) =>
					route.isAsync
						? ((this.controller[route.methodName] as RouteRequestFn)(req, res, next) as Promise<unknown>).catch(
								(err: unknown) => next(err),
							)
						: (this.controller[route.methodName] as RouteRequestFn)(req, res, next),
			),
		);
	}

	static create<T extends object>(express: Express, controller: T, middlewares: RouteRequestFn[] = []) {
		return new AppRoute(express, controller, middlewares);
	}
}
