import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/user.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { Container, ContainerModule } from 'inversify';
import { TYPES } from './common/types';
import { ILogger } from './logger/logger.service.interface';
import 'reflect-metadata';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { IUserControllerInterface } from './users/user.controller.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';

const appBindings = new ContainerModule((bind) => {
	bind<App>(TYPES.App).to(App).inSingletonScope();
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IUserControllerInterface>(TYPES.IUserInterface).to(UserController).inSingletonScope();
	bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
});

function bootstrap(): { app: App; appContainer: Container } {
	const appContainer = new Container({ autoBindInjectable: true });
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.App);
	app.init();

	return { app, appContainer };
}

bootstrap();
