import { Router } from "express";
import * as controllers from '.';

export const basketRoutesFactory = () => {
    let router = Router();

    for (const key in controllers) {
        const controller = new controllers[key]();
        router.use(controller.router)
    }

    return router
}