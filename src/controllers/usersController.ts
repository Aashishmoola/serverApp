import { usersStorage } from "../storages/usersStorages";
import { RequestHandler } from "express";
import{ body, validationResult} from "express-validator"

const ALPHA_ERR = "must only contain letters."
const LENGTH_ERR = "must be between 1 and 10 characters."

const validateUser = []

export { usersController };

const usersListGet: RequestHandler = (req, res) => {
  res.render("index", {
    title: "User List",
    users: usersStorage.getUsers(),
  });
};

const usersCreateGet: RequestHandler = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

const usersCreatePost: RequestHandler = (req, res) => {
  const { firstName, lastName } = req.body;
  usersStorage.addUser({ firstName, lastName });
  res.redirect("/");
};

const usersController = { usersListGet, usersCreateGet, usersCreatePost };
