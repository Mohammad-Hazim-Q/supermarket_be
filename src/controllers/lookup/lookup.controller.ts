import { NextFunction, Request, Response } from "express";
import { success } from "../../helpers";

import { LookupRepository } from "../../repositories/lookup.repository";
import { AbstractController } from "../abstract.controller";

export class LookupController extends AbstractController {
    repository = new LookupRepository()
    constructor() {
        super();
    }

    initRoutes(): void {

        this.router.get(
            this.path + "/category",
            this.getCategories.bind(this)
        )

        this.router.get(
            this.path + "/product",
            this.getProducts.bind(this)
        )

        this.router.get(
            this.path + "/random",
            this.getRandomProducts.bind(this)
        )
    }

    async getCategories(req: Request, res: Response, next: NextFunction) {

        try {

            let result = await this.repository.getAllCategories();

            success(res, result);

        } catch (error) {
            next(error)
        }

    }


    async getProducts(req: Request, res: Response, next: NextFunction) {

        try {

            let categoryId = req.query.categoryId
            let result = await this.repository.getProducts(categoryId);
            success(res, result);

        } catch (error) {
            next(error)
        }

    }

    async getRandomProducts(req: Request, res: Response, next: NextFunction) {

        try {

            let result = await this.repository.getRandomProducts();

            success(res, result);
        } catch (error) {
            next(error)
        }

    }

}