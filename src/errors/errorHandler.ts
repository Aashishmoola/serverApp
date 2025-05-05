import { ErrorRequestHandler } from "express"
import { CustomError } from "./customError"

export {errorHandler}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log("Custom Error handler layer is called ...")
    
    if (res.headersSent) {
        // to check if a res was already sent, in which case call next(error) that will match
        // default errorHandler layer in expressJS
        console.warn("Headers already sent, passing to default error handler")
        next(error)
    }

    if (error instanceof CustomError) {
        res.status(error.statusCode).json(({
            error: {
                message: error.message
            }
        }))
    }
    else {
        res.status(500).json({
            error: {
                message: getErrorMessage(error)
            }
        })
    }
}

function getErrorMessage(error: unknown): string {
    if (!error) return "Valid error is not provided in getErrorMessage()"
 
    if (error instanceof Error) return error.message

    if (typeof error === "object" && "message" in error) return String(error.message)

    if (typeof error === "string") return error

    return "An unaccounted error occurred"
}