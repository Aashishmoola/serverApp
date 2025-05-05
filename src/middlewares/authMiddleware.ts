import jwt from "jsonwebtoken"
import {RequestHandler} from "express"
import { getDotenVar } from "../helpers/dotenv"
import { CustomError } from "../errors/customError"
import { IJWTPayload} from "../types/globalTypes"

export {verifyJWToken, verifyIfAdmin, globalVerifyJWToken}

const JWT_SECRET_KEY = getDotenVar("JWT_SECRET_KEY")

const verifyJWToken: RequestHandler = (req, res, next) => {
    const authHeader = req.header("Authorization")?.split(" ")
    if (!authHeader) throw new CustomError({message: "Authorization header does not exist in request", statusCode: 400})
    
    let token: string | null = null
    if(authHeader[0] === "Bearer" && authHeader[1]) token = authHeader[1]

    if(!token) throw new CustomError({message: "Format of Authorization header is not of type: 'Bearer token' ", statusCode: 400})

    // Will throw error caught by error handling layer
    const decodedJWTPayload = jwt.verify(token, JWT_SECRET_KEY) as IJWTPayload
    
    req.userEmail = decodedJWTPayload.userEmail    
    req.isAdmin = decodedJWTPayload.isAdmin

    console.log(req.userEmail, req.isAdmin)

    next()

}

const verifyIfAdmin: RequestHandler = (req, res, next) => {
    if (!req.isAdmin) throw new CustomError({message: "User is not an authorised administrator", statusCode: 401})
    next()
}

const globalVerifyJWToken: RequestHandler = (req, res, next) => {
    // Exclude authentication routes from JWT verification
    if (req.path.includes('/login') || req.path.includes('/register')) return next()
    verifyJWToken(req, res, next)
}