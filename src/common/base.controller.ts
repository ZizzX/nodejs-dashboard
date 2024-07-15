import { Response, Router } from 'express';
import { ExpressReturnType, IRoute } from './route.interface';
import { ILogger } from '../logger/logger.service.interface';

export abstract class BaseController {
	private readonly _router: Router;

	protected constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}
	public send<T>(res: Response, code: number, dto?: T): ExpressReturnType {
		return !!dto ? res.status(code).json(dto) : res.sendStatus(code);
	}
	public ok<T>(res: Response, dto?: T): ExpressReturnType {
		return this.send(res, 200, dto);
	}
	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IRoute[]): void {
		routes.forEach((route) => {
			this.logger.info(`Binding route ${route.method.toUpperCase()} ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		});
	}
}
