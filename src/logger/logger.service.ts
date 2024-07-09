import { Logger } from "tslog";
import {ILogger} from "./logger.service.interface";
import {injectable} from "inversify";
import "reflect-metadata";

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

    info(...args: unknown[]) {
        this.logger.info(args);
    }

    error(...args: unknown[]) {
        this.logger.error(args);
    }

    warn(...args: unknown[]) {
        this.logger.warn(args);
    }
}
