import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator"
import { ValidationError } from "../error-handler/validation-error.class";

export const validate = (req: Request, res: Response, next: NextFunction) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array);
        return next(new ValidationError(errors.array()))
    }

    next();
}