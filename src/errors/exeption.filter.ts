import {NextFunction, Request, Response} from "express";
import {IExeptionFilterInterface} from "./exeption.filter.interface";
import {LoggerService} from "../logger/logger.service";
import {HttpError} from "./http-error.class";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {TYPES} from "../common/types";

@injectable()
export class ExeptionFilter implements IExeptionFilterInterface {
    private logger: LoggerService;

    constructor(
        @inject(TYPES.LoggerService) logger: LoggerService
    ) {
        this.logger = logger;
    }
    catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HttpError) {
            this.logger.error(`[Ошибка ${err.context}] ${err.statusCode}: ${err.message}`);
            res.status(err.statusCode).send(err.message);
        } else {
            this.logger.error(`[Ошибка неизвестна] ${err.message}`);
            res.status(500).send('Internal server error');
        }
    }
}
