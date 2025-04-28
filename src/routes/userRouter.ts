import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";
export {userRouter}

const userRouter = Router()

// Register User

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)