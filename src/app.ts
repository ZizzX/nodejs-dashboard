import express, {Express, NextFunction, Request, Response} from "express";
import { Server } from "http";
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/user.controller";
import {ExeptionFilter} from "./errors/exeption.filter";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {TYPES} from "./common/types";

@injectable()
export class App {
    app: Express;
    server: Server | undefined;
    port: number;
    logger: LoggerService;
    userController: UserController;
    exeptionFilter: ExeptionFilter;
    constructor(
        @inject(TYPES.LoggerService) logger: LoggerService,
        @inject(TYPES.UserController) userController: UserController,
        @inject(TYPES.ExeptionFilter) exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExeptionFilters();
        this.server = this.app.listen(this.port, () => {
            this.logger.info(`Server is running on port ${this.port}`);
        });
    }
}
