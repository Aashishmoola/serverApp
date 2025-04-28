import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/productsController";
export {productsRouter}

const productsRouter = Router()

// GET requests
productsRouter.get("/all", getAllProducts)

// POST requests
productsRouter.post("/create", createProduct)