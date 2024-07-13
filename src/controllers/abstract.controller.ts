import { Router } from "express";


export abstract class AbstractController {
    router: Router
    path: string;

    constructor(path = "") {
        this.router = Router();
        this.path = path;
        this.initRoutes();
    }

    abstract initRoutes(): void;
}