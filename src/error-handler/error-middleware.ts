import { NextFunction, Request, Response } from "express";
import { HttpException } from "./http-error.class";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof HttpException) {
        return res.status(err.status).send(err)
    }

    else {
        console.log(err);
        return res.status(500).send(
            err
            // process.env.ENVIRONMENT == "DEVELOPMENT" ?  : 'Internal Server Error...'
        );
    }
}
