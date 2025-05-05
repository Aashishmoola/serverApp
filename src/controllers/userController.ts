import { RequestHandler } from "express"
import { User, IUser } from "../models/userSchema"
import asyncHandler from "express-async-handler"
import { CustomError } from "../errors/customError"
import {getUserInDB, verifyIfEmailIsAdmin, verifyPhoneNum, verifyPassword, hashPassword, createJWToken} from "../dBHandlers/userDBhandler"

export {registerUser, loginUser, updateUser, updateUserPassword, deleteUser}




const registerUser: RequestHandler = asyncHandler( async (req, res) => {
    const {userName, password, email, shippingAddress, phoneNum} = req.body
    // If incorrect or missing field types are provided, 
    // model will throw error that is caught by asyncHandler 
    const passwordHash = await hashPassword(password)

    const isAdmin = verifyIfEmailIsAdmin(email)

    const user = new User({userName, passwordHash, email, shippingAddress, phoneNum, _isAdmin: isAdmin})

    user.save()

    res.status(201).json(user)
})

const loginUser: RequestHandler = asyncHandler(async (req, res) => {
    const {userName, email, password} = req.body

    const user = await getUserInDB(userName, email)
    await verifyPassword(password, user)
    
    // doc.id is doc._id casted as a string (mongoose provides a virtual id getter)
    const token = createJWToken(user.email, user._isAdmin)     
    
    res.status(201).json({ success: "Authenticated", token})
})

const updateUser: RequestHandler = asyncHandler(async (req, res) => {
    const updatedUserProps: Omit<IUser, "email" | "passwordHash" | "_isAdmin"> = req.body.updatedUserProps
    const password = req.body.password

    const email = req.userEmail
    if (!email) throw new CustomError({message: " UserEmail from JWT payload has unsuccessfully been attatched to req obj", statusCode: 500})

    const {userName, shippingAddress, phoneNum} = updatedUserProps

    const user = await getUserInDB("", email)
    await verifyPassword(password, user)

    if (userName) user.userName = userName
    if (shippingAddress) user.shippingAddress = shippingAddress
    if (phoneNum) user.phoneNum = phoneNum

    user.save()
    res.status(201).json(user)
})

const updateUserPassword: RequestHandler = asyncHandler(async (req, res) => {
    const {phoneNum, currentPassword, updatedPassword} = req.body
    
    const email = req.userEmail
    if (!email) throw new CustomError({message: " UserEmail from JWT payload has unsuccessfully been attatched to req obj", statusCode: 500})

    const user = await getUserInDB("", email)
    await verifyPassword(currentPassword, user)
    verifyPhoneNum(user, phoneNum)

    const passwordHash = await hashPassword(updatedPassword)

    if (passwordHash) user.passwordHash = passwordHash

    user.save()
    res.status(201).json(user)
})

const deleteUser: RequestHandler = asyncHandler(async (req, res) => {
    const {phoneNum, password} = req.body   
    
    const email = req.userEmail
    if (!email) throw new CustomError({message: " UserEmail from JWT payload has unsuccessfully been attatched to req obj", statusCode: 500})

    const user = await getUserInDB("", email)
    await verifyPassword(password, user)
    verifyPhoneNum(user, phoneNum)

    const deletedUser = await User.findOneAndDelete().where("email").equals(email)
    if (!deletedUser) throw new CustomError({message: "There was an error when deleting user" , statusCode: 500})
    res.status(201).json(deletedUser)
})

