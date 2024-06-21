import cors from 'cors';
import express from 'express';
import { RouteRequestFn, AppRoute } from './app-route';
import { errorMiddleware } from './middlewares/error.middleware';

export class App {
	private port: number;
	private express: express.Express;

	constructor(port: number) {
		this.port = port;
		this.express = express();
		this.setConfigurations();
	}

	private setConfigurations() {
		this.express.use(cors());
		this.express.use(express.json());
	}

	public setController<T extends object>(controller: T, middlewares: RouteRequestFn[] = []) {
		AppRoute.create(this.express, controller, middlewares);
	}

	public listen(callback?: () => void) {
		this.express.use(errorMiddleware);
		this.express.listen(this.port, callback ?? (() => console.log(`Server running at http://localhost:${this.port}`)));
	}
}
