import * as cors from "cors";
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Express, NextFunction, Request, Response } from 'express';
import * as path from "path";
import { authRoutesFactory } from "../controllers/auth/router-factory";
import { basketRoutesFactory } from "../controllers/basket/router-factory";
import { lookupRoutesFactory } from "../controllers/lookup/router-factory";
import { errorHandler } from "../error-handler/error-middleware";
import { AuthPayload } from "../middleware";
dotenv.config();

// to make the file a module and avoid the TypeScript error
export { };

declare global {
    namespace Express {
        export interface Request {
            user?: AuthPayload;
        }
    }
}


class Server {

    app: Express;

    constructor() {

        this.initServer();
    }

    initServer() {

        this.app = express();
        this.app.set("port", process.env.PORT || 3005);

        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use("/public", express.static(path.join(__dirname, "../public")))

        this.initRoutes();

        this.app.use(errorHandler)
    }


    initRoutes() {

        this.app.use('/api/v1/auth', authRoutesFactory());
        this.app.use('/api/v1/lookup', lookupRoutesFactory());
        this.app.use('/api/v1/basket', basketRoutesFactory());

        this.app.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send("works")
        });
    }

    public start() {
        let port = this.app.get('port')
        this.app.listen(port, () => {
            console.log(`Server works on port ${port}...`);
        })
    }
}


const server = new Server();

server.start();
