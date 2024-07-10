import { Router, Response } from "express";
import {IRoute} from "./route.interface";
import { ILogger } from "../logger/logger.service.interface";
import {injectable} from "inversify";
import "reflect-metadata";

// @ts-ignore
@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    protected constructor(
        private logger: ILogger
    ) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }
    public send<T>(res: Response, code: number, dto?: T) {
        return !!dto ? res.status(code).json(dto) : res.sendStatus(code);
    }
    public ok<T>(res: Response, dto?: T) {
        return this.send(res, 200, dto);
    }
    public created(res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IRoute[]) {
        routes.forEach((route) => {
            this.logger.info(`Binding route ${route.method.toUpperCase()} ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        })
    }
}
