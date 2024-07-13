
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { exceptionMap } from "../error-handler/exception-map";
import { HttpException } from "../error-handler/http-error.class";


export interface AuthPayload {
    id: number;
    name: string;
    email: boolean;
}

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.headers.authorization) {
            throw new HttpException(exceptionMap.Unauthorized);
        }

        let token = req.headers.authorization;

        let payload = jwt.verify(token, process.env.SECRET_KEY)

        if (!payload) throw new HttpException(exceptionMap.Unauthorized);

        let user: any = payload;

        req.user = user

        return next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(new HttpException(exceptionMap.TokenExpired))
        }

        next(new HttpException(exceptionMap.Unauthorized));
    }
}