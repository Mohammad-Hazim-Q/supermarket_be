import { body, query } from "express-validator";
import { validate } from ".";



export const getPaymentsValidator = [
    query("type", "Type is missing.")
        .isIn([1, 2]).withMessage("Invalid type number."),

    validate
]

export const takeActionValidator = [
    body("action", "action is missing.")
        .isIn([2, 3]).withMessage("Invalid action number."),

    body("payment", "Invalid payment id.")
        .isInt().withMessage("Invalid payment number."),

    body("reason", "Invalid reason value.")
        .isString().withMessage("Invalid reason value.").optional({ nullable: true, checkFalsy: true }),

    validate
]

export const inquirePaymentFromSSCValidators = [
    query("payNo", "payment number is missing."),
    query("serviceType", "service type is missing."),

    validate
]

export const savePaymentValidators = [

    body("transactionMaxAmount", "payment number is missing.").isNumeric().withMessage("Invalid transaction max amount value."),
    body("transactionDueAmount", "transactionDueAmount is missing.").isNumeric().withMessage("Invalid transaction due amount value."),
    body("transactionAmount", "transactionAmount is missing.").isNumeric().withMessage("Invalid transaction amount value."),
    body("paymentRefNumber", "paymentRefNumber is missing.").isString().withMessage("Invalid payment number value."),
    body("customerName", "customerName is missing.").isString().withMessage("Invalid customer name value."),
    body("sscIBAN", "sscIBAN is missing.").isString().withMessage("Invalid SSC IBAN value."),
    body("serviceType", "serviceType is missing.").isInt().withMessage("Invalid service type value."),
    body("serviceDesc", "serviceDesc is missing.").isString().withMessage("Invalid service description value."),
    body("forIndividual", "forIndividual is missing.").isBoolean().withMessage("Invalid transaction amount value."),
    body("isPartial", "isPartial is missing.").isBoolean().withMessage("Invalid partial value."),
    body("channelType", "channelType is missing.").isInt().withMessage("Invalid channel type value."),
    body("billerName", "billerName is missing.").isString().withMessage("Invalid Biller name value."),

    validate
]