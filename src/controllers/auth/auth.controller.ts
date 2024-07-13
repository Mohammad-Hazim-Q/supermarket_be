import { NextFunction, Request, Response } from "express";
import { success } from "../../helpers";

import { authGuard } from "../../middleware";
import { AuthRepository } from "../../repositories/auth.repository";
import { createUserValidators, loginValidators } from "../../validators/auth.validator";
import { AbstractController } from "../abstract.controller";

export class AuthController extends AbstractController {
    repository = new AuthRepository()
    constructor() {
        super();
    }

    initRoutes(): void {
        this.router.post(
            this.path + "/me",
            [
                authGuard
            ],
            this.loggedInUserData.bind(this)
        )

        this.router.post(
            this.path + "/login",
            [
                ...loginValidators
            ],
            this.login.bind(this)
        )

        this.router.post(
            this.path + "/signup",
            [
                ...createUserValidators
            ],
            this.createUser.bind(this)
        )
    }


    async loggedInUserData(req: Request, res: Response, next: NextFunction) {

        try {
            let payload = {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email
            }
            success(res, payload);
        } catch (error) {
            next(error)
        }

    }
    async login(req: Request, res: Response, next: NextFunction) {

        try {

            let result = await this.repository.login(
                req.body.email,
                req.body.password
            );

            success(res, result);

        } catch (error) {
            next(error)
        }

    }

    async createUser(req: Request, res: Response, next: NextFunction) {

        try {

            let result = await this.repository.createUser(
                req.body.email,
                req.body.password,
                req.body.name,
            )

            success(res, result)

        } catch (error) {
            next(error)
        }

    }

}