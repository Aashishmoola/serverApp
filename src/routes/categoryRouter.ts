import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categoryController";
import { verifyIfAdmin } from "../middlewares/authMiddleware";

export {categoryRouter}

const categoryRouter = Router()

categoryRouter.get("/all", getAllCategories)
categoryRouter.get("/:categoryName", getCategory)

categoryRouter.post("/create", verifyIfAdmin, createCategory)

categoryRouter.put("/update/:categoryName", verifyIfAdmin, updateCategory)

categoryRouter.delete("/delete/:categoryName", verifyIfAdmin, deleteCategory)
