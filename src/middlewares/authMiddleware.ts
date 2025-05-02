import jwt from "jsonwebtoken"
import { RequestHandler } from "express"
import { getDotenVar } from "../helpers/dotenv"
import { CustomError } from "../errors/customError"
import { IJWTPayload } from "../types/globalTypes"

const JWT_SECRET_KEY = getDotenVar("JWT_SECRET_KEY")



const verifyJWToken: RequestHandler = (req, res, next) => {
    const authHeader = req.header("Authorization")
    if (!authHeader) throw new CustomError({message: "Authorization header does not exist in request", statusCode: 400})
    
    let token: string | null = null
    if(authHeader[0] === "Bearer" && authHeader[1]) token = authHeader[1]

    if(!token) throw new CustomError({message: "Format of authHeader is not of type: ['Bearer': token]", statusCode: 400} )

    // Will throw error caught by error handling layer
    const decodedJWTPayload = jwt.verify(token, JWT_SECRET_KEY) as IJWTPayload
    
    
    // Attach userId and isAdmin to req object
    req.userId = decodedJWTPayload.userId
    req.isAdmin = decodedJWTPayload.isAdmin

}

