import { Response } from "express";



export const success = (res: Response, data: unknown, status?: number) => {
    res.status(status || 200).send(data);
}


export class AppRegex {

    static usernameRegex(): RegExp {
        return /^[a-z0-9_-]{3,16}$/
    }

    static complexPassword(): RegExp {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    }
}