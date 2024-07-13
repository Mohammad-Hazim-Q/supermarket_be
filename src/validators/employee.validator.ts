import { body } from "express-validator";

import { AppRegex } from "../helpers";
import { EmployeeType } from "../helpers/enums";
import { validate } from "./index";


export const createEmployeeValidators = [

    body("id").isInt().withMessage("Incorrect id value.").optional({ checkFalsy: true, nullable: true }),
    body("username", "Invalid username.").isString().matches(AppRegex.usernameRegex()).withMessage("Incorrect username format."),
    body("password", "Password must be exists.").isString().matches(AppRegex.complexPassword()).withMessage("Incorrect password format.").optional({ nullable: true, checkFalsy: true }),
    // body("code", "Invalid code.").isString().isLength({ min: 4, max: 5 }).withMessage("Invalid code length."),
    body("name", "Invalid name.").isString(),
    body("mobile", "Invalid mobile.").isString().optional({ checkFalsy: true, nullable: true }),
    body("email").isEmail().optional({ checkFalsy: true, nullable: true }),
    body("employeeType", "Invalid employee type.").isIn([EmployeeType.Teller, EmployeeType.Checker, EmployeeType.Auditor]).withMessage("Invalid employee type id.").optional({ nullable: true }),
    body("branch", "Invalid branch.").isInt().withMessage("Invalid branch id."),
    body("checker", "Invalid checker.").isInt().withMessage("Invalid checker id.").optional({ checkFalsy: true, nullable: true }),

    validate
];

export const updateEmployeePasswordValidators = [
    body("currentPassword", "Current password must be exists.").isString(),
    body("password", "Password must be exists.").isString().matches(AppRegex.complexPassword()).withMessage("Incorrect password format."),
    validate
];

