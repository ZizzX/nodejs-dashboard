import {ILogger} from "../logger/logger.service.interface";
import {LoggerService} from "../logger/logger.service";
import {UserController} from "../users/user.controller";

const TYPES = {
    LoggerService: Symbol.for("LoggerService"),
    UserController: Symbol.for("UserController"),
    ExeptionFilter: Symbol.for("ExeptionFilter"),
};

export { TYPES };
