import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from './common/types';
import { ILogger }                  from './logger/logger.service.interface';
import { IExceptionFilter }         from './errors/exeption.filter.interface';
import { IUserControllerInterface } from './users/user.controller.interface';

@injectable()
export class App {
	app: Express;
	server: Server | undefined;
	port: number;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.IUserInterface) private userController: IUserControllerInterface,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddlewares(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	useRoutes(): void {
		this.app.use('/user', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddlewares();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port, () => {
			this.logger.info(`Server is running on port ${this.port}`);
		});
	}
}
