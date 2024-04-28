import { Logger } from "tslog";
import {UserController} from "../users/user.controller";

export class LoggerService {
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
