import { User, IUser } from "../models/userSchema"
import jwt from "jsonwebtoken"
import { getDotenVar } from "../helpers/dotenv"
import bcrypt from "bcrypt"
import { CustomError } from "../errors/customError"
import { IJWTPayload } from "../types/globalTypes"

export {getUserInDB, verifyIfEmailIsAdmin, verifyPhoneNum, verifyPassword, hashPassword, createJWToken}

const JWT_SECRET_KEY = getDotenVar("JWT_SECRET_KEY")
const ADMIN_1 = getDotenVar("ADMIN_1")
const ADMIN_2 = getDotenVar("ADMIN_2")

async function getUserInDB(userName: string, email: string){
    let user: IUser | null
    if (userName) user = await User.findOne().where("userName").equals(userName)
    else if (email) user = await User.findOne().where("email").equals(email)
    else throw new CustomError({message: "Neither UserName nor email is provided in req body", statusCode: 400 })
    
    if (!user) throw new CustomError({message: `User with ${userName || email} is not found`, statusCode: 404 })
    
    return user
}

function verifyPhoneNum(user: IUser, phoneNum: number){
    // This is where 2FA for phoneNum can be added
    if (!(user.phoneNum === phoneNum)) throw new CustomError({message: "Provided Phone Number is incorrect", statusCode: 400})
}

async function verifyPassword(password: string, user: IUser){
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordCorrect) throw new CustomError({message: "Password is incorrect. Please try again with correct password", statusCode: 400})
}

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
}

function createJWToken(userEmail: string, isAdmin: boolean){
    const JWTPayload: Omit<IJWTPayload, 'iat' | 'exp'> = {userEmail, isAdmin}
    return jwt.sign(JWTPayload, JWT_SECRET_KEY, {expiresIn: "1h"})
}

function verifyIfEmailIsAdmin(userEmail: string) {
    if (userEmail === ADMIN_1 || userEmail === ADMIN_2) return true
    return false
}
