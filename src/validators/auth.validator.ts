import { body } from "express-validator";
import { validate } from ".";


export const loginValidators = [

    body("email", "Invalid email").isEmail().withMessage("Invalid email value."),
    body("password", "Invalid password").isString().withMessage("Invalid password value."),

    validate
]

export const createUserValidators = [

    body("email", "Invalid email.").isEmail().withMessage("Invalid email value."),
    body("password", "Invalid password."),
    body("name", "Invalid name.").isString().withMessage("Invalid name value."),

    validate
]