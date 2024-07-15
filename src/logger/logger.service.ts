import { Logger } from 'tslog';
import { ILogger } from './logger.service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<any>;

	constructor() {
		this.logger = new Logger({
			hideLogPositionForProduction: true,
			type: 'pretty',
			stylePrettyLogs: true,
		});
	}

	info(...args: unknown[]): void {
		this.logger.info(args.join(' '));
	}

	error(...args: unknown[]): void {
		this.logger.error(args.join(' '));
	}

	warn(...args: unknown[]): void {
		this.logger.warn(args.join(' '));
	}
}
