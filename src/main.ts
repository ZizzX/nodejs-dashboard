import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/user.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { Container, ContainerModule } from 'inversify';
import { TYPES } from './common/types';
import { ILogger } from './logger/logger.service.interface';
import 'reflect-metadata';
import { IExeptionFilter } from './errors/exeption.filter.interface';

async function bootstrap(): Promise<{ app: App; container: Container }> {
	const containerModule = new ContainerModule((bind) => {
		bind<App>(TYPES.App).to(App).inSingletonScope();
		bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
		bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
		bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter).inSingletonScope();
	});

	const container = new Container({ autoBindInjectable: true });
	container.load(containerModule);
	const app = container.get<App>(TYPES.App);
	app.init();

	return { app, container };
}

bootstrap();
