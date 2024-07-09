import {BaseController} from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {TYPES} from "../common/types";

@injectable()
export class UserController extends BaseController {
    constructor(
        @inject(TYPES.LoggerService) logger: LoggerService,
    ) {
        super(logger);
        this.bindRoutes([
            {
                path: '/login',
                method: 'post',
                func: this.login
            },
            {
                path: '/register',
                method: 'post',
                func: this.register
            },
        ])
    }

    login(req: Request, res: Response, nextArg: NextFunction) {
        this.ok(res,  'login')
    }

    register(req: Request, res: Response, nextArg: NextFunction) {
        this.send(res, 200, 'register')
    }
}
