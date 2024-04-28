import {BaseController} from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import {IRoute} from "../common/route.interface";
import {NextFunction, Request, Response} from "express";

export class UserController extends BaseController {
    constructor(
        logger: LoggerService
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
