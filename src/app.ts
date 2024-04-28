import express, { Express } from "express";
import { Server } from "http";
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/user.controller";
import {IRoute} from "./common/route.interface";

export class App {
    app: Express;
    server: Server | undefined;
    port: number;
    logger: LoggerService;
    userController: UserController
    constructor(
        logger: LoggerService,
        userController: UserController
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            this.logger.info(`Server is running on port ${this.port}`);
        });
    }

}
