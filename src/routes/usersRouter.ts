import { Router } from "express";
import {usersController} from "../controllers/usersController";

export { usersRouter };

const usersRouter = Router();

usersRouter.get("/", usersController.usersListGet)
usersRouter.get("/create", usersController.usersCreateGet)
usersRouter.post("/create", usersController.usersCreatePost)
