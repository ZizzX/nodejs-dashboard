import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { decorate, inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.service.interface';
import { HttpError } from '../errors/http-error.class';
import { IUserControllerInterface } from './user.controller.interface';
import { UserLoginDto } from './dto/user.login.dto';
import { UserRegisterDto } from './dto/user.register.dto';
import { UserService } from './user.service';

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

	login(req: Request<object, object, UserLoginDto>, res: Response, next: NextFunction): void {
		next(new HttpError(401, 'Unauthorized', 'login'));
	}

	async register(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = new UserService();
		const user = await result.createUser(body);

		if (!user) {
			next(new HttpError(400, 'Bad Request', 'register'));
			return;
		}

		this.ok(res, {
			name: user.name,
			email: user.email,
			password: user.password,
		});
	}
}
