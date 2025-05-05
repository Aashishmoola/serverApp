import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/productsController";
import { verifyIfAdmin } from "../middlewares/authMiddleware";

export {productsRouter}

const productsRouter = Router()

// GET requests
productsRouter.get("/all", verifyIfAdmin, getAllProducts)

// POST requests
productsRouter.post("/create", verifyIfAdmin, createProduct)