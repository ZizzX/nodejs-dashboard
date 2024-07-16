import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { decorate, inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.service.interface';
import { HttpError } from '../errors/http-error.class';
import { IUserControllerInterface } from './user.controller.interface';

decorate(injectable(), BaseController);

@injectable()
export class UserController extends BaseController implements IUserControllerInterface {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HttpError(401, 'Unauthorized', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.send(res, 200, 'register');
	}
}
