import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/user.controller";
import {ExeptionFilter} from "./errors/exeption.filter";
import {Container, ContainerModule} from "inversify";
import {TYPES} from "./common/types";
import {ILogger} from "./logger/logger.service.interface";
import "reflect-metadata";

async function bootstrap() {
    const myContainerModule = new ContainerModule((
        bind,
    ) => {
        bind<App>(TYPES.App).to(App).inSingletonScope();
        bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
        bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
        bind<ExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
    });

    const container = new Container({ autoBindInjectable: true });
    container.load(myContainerModule);
    const app = await container.getAsync<App>(App);
    app.init();
}

bootstrap();
