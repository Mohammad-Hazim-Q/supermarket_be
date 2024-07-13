import { query } from "express-validator";
import { validate } from ".";


export const productsValidators = [
    query('categoryId').exists().withMessage('Invalid categoryId'),

    validate
]