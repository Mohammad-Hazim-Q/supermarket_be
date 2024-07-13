import { Router } from "express";
import * as controllers from '.';

export const lookupRoutesFactory = () => {
    let router = Router();

    for (const key in controllers) {
        const controller = new controllers[key]();
        router.use(controller.router)
    }

    return router
}