import {NextFunction, Response, Request} from "express";

export const validation =
    (schema) =>
        async (req: Request, res: Response, next: NextFunction) => {
            await schema.validate(req);
            return next();
        };