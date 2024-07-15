import express, { Express } from 'express';
import { Server } from 'http';
import 'reflect-metadata';
import { UserController } from './users/user.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from './common/types';
import { ILogger } from './logger/logger.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';

@injectable()
export class App {
	app: Express;
	server: Server | undefined;
	port: number;
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.IExeptionFilter) private exeptionFilter: IExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExeptionFilters();
		this.server = this.app.listen(this.port, () => {
			this.logger.info(`Server is running on port ${this.port}`);
		});
	}
}
