import {NextFunction, Request, Response} from "express";
import {IExeptionFilter} from "./exeption.filter.interface";
import {LoggerService} from "../logger/logger.service";
import {HttpError} from "./http-error.class";
import {inject, injectable} from "inversify";
import "reflect-metadata";
import {TYPES} from "../common/types";
import {ILogger} from "../logger/logger.service.interface";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
    constructor(
        @inject(TYPES.ILogger) private logger: ILogger
    ) {}
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
