import { RequestHandler } from "express"
import { getDotenVar } from "../helpers/dotenv"
import { User, IUser } from "../models/userSchema"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import asyncHandler from "express-async-handler"
import { CustomError } from "../errors/customError"
import { IJWTPayload } from "../types/globalTypes"

export {registerUser, loginUser}

const JWT_SECRET_KEY = getDotenVar("JWT_SECRET_KEY")

// Register User

const registerUser: RequestHandler = asyncHandler( async (req, res) => {
    const {userName, password, email, shippingAddress, phoneNum, isAdmin} = req.body
    // If incorrect or missing field types are provided, 
    // model will throw error that is caught by asyncHandler 
    const passwordHash = await hashPassword(password)

    const user = new User({userName, passwordHash, email, shippingAddress, phoneNum, isAdmin})
    user.save()
    res.status(201).json(user)
})

const loginUser: RequestHandler = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body

    let user: IUser | null
    if (userName) user = await User.findOne().where("userName").equals(userName)
    else if (email) user = await User.findOne().where("email").equals(email)
    else throw new CustomError({message: "Neither UserName nor email is provided in req body", statusCode: 400 })

    if (!user) throw new CustomError({message: `User with ${userName || email} is not found`, statusCode: 404 })
    
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordCorrect) throw new CustomError({message: "Password is incorrect. Please try again with correct password", statusCode: 400})

    // doc.id is doc._id casted as a string (mongoose provides a virtual id getter)
    const token = createJWToken(user.id, user.isAdmin)

    res.status(201).json({ success: "Authenticated", token})
})



async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
}

function createJWToken(userId: string, isAdmin: boolean){
    const JWTPayload: Omit<IJWTPayload, 'iat' | 'exp'> = {userId, isAdmin}
    return jwt.sign(JWTPayload, JWT_SECRET_KEY, {expiresIn: "1h"})
}
