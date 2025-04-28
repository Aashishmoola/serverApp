import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/categoryController";

export {categoryRouter}

const categoryRouter = Router()

categoryRouter.get("/all", getAllCategories)
categoryRouter.get("/:categoryName", getCategory)

categoryRouter.post("/create", createCategory)

categoryRouter.put("/update/:categoryName", updateCategory)

categoryRouter.delete("/delete/:categoryName", deleteCategory)
