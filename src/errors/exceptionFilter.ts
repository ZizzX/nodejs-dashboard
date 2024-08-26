import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter }                from './exeption.filter.interface';
import { HttpError }                       from './http-error.class';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../common/types';
import { ILogger } from '../logger/logger.service.interface';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`[Ошибка ${err.context}] ${err.statusCode}: ${err.message}`);
			res.status(err.statusCode).send(err.message);
		} else {
			this.logger.error(`[Ошибка неизвестна] ${err.message}`);
			res.status(500).send('Internal server error');
		}
	}
}
