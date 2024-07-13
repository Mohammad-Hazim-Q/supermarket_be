import { NextFunction, Request, Response } from "express";
import { success } from "../../helpers";
import { authGuard } from "../../middleware";
import { BasketRepository } from "../../repositories/basket.repository";
import { AbstractController } from "../abstract.controller";

export class BasketController extends AbstractController {
    repository = new BasketRepository()

    constructor() {
        super();
    }

    initRoutes(): void {

        this.router.get(
            this.path + "/",
            [authGuard],
            this.getBasket.bind(this)
        )

        this.router.post(
            this.path + "/",
            [authGuard],
            this.addToBasket.bind(this)
        )

        this.router.delete(
            this.path + "/",
            [authGuard],
            this.deleteBasket.bind(this)
        )
    }

    async getBasket(req: Request, res: Response, next: NextFunction) {

        try {

            let result = await this.repository.getBasket(req.user.id);

            success(res, result);

        } catch (error) {
            next(error)
        }

    }


    async addToBasket(req: Request, res: Response, next: NextFunction) {

        try {

            let product = req.body
            let result = await this.repository.addToBasket(req.user.id, product);
            success(res, result);

        } catch (error) {
            next(error)
        }

    }
    async deleteBasket(req: Request, res: Response, next: NextFunction) {

        try {

            let id = req.query.id
            let result = await this.repository.deleteBasket(req.user.id, id);
            success(res, result);

        } catch (error) {
            next(error)
        }

    }

}