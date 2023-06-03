import {ErrorRequestHandler, Request, Response, NextFunction} from "express";

import Logger from "../config/Logger";
import {StatusCodeError} from "../errors/StatusCodeError";

const errorHandler: ErrorRequestHandler = (
    err: StatusCodeError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Logger.error({message: err.message, status: err.statusCode, stack: err.stack});
    res.status(err.statusCode || 400).json({error: err.message});
    next(err);
};

export default errorHandler;