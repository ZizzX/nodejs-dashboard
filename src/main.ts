import { App } from "./app";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/user.controller";
import {ExeptionFilter} from "./errors/exeption.filter";
import { Container } from "inversify";
import {TYPES} from "./common/types";
import {ILogger} from "./logger/logger.service.interface";
import "reflect-metadata";

const myContainer = new Container();
myContainer.bind<ILogger>(TYPES.LoggerService).to(LoggerService);
myContainer.bind<UserController>(TYPES.UserController).to(UserController);
myContainer.bind<ExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);

async function bootstrap() {
    const logger = new LoggerService();
    const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));
    await app.init();
}

bootstrap();
