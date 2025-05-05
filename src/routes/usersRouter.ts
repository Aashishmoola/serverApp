import { Router } from "express";
import { registerUser, loginUser, updateUser, updateUserPassword, deleteUser} from "../controllers/userController";

export {usersRouter}

const usersRouter = Router()

// Register User, returns User
usersRouter.post("/register", registerUser)

// Login User, return JWT token
usersRouter.post("/login", loginUser)

usersRouter.put("/update", updateUser)
usersRouter.put("/updatePassword", updateUserPassword)

usersRouter.delete("/delete", deleteUser)