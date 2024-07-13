import { HttpStatusCode } from "../helpers/enums";

export const exceptionMap = {
    Unauthorized: {
        message: "You are not authorized.",
        status: HttpStatusCode.Unauthorized,
        customCode: ""
    },
    TokenExpired: {
        message: "Your session has expired, please login again.",
        status: HttpStatusCode.Unauthorized,
        customCode: ""
    },
    NoDataFound: {
        message: "No data found",
        status: HttpStatusCode.NotFound,
        customCode: ""
    },

    EmailExists: {
        message: "The email already exists.",
        status: HttpStatusCode.BadRequest,
        customCode: ""
    },

    InvalidUsernameOrPassword: {
        message: "Wrong username or password.",
        status: HttpStatusCode.BadRequest,
        customCode: ""
    },

    FileNotFound: {
        message: "File not found.",
        status: HttpStatusCode.NotFound,
        customCode: ""
    },
}