import { RequestHandler } from "express"
import { Product } from "../models/productSchema"

export {createProduct, getAllProducts}

// Only use the save method and do not use update/create methods as per 
// mongoose library as they will skip schema validation

const createProduct: RequestHandler = async (req, res) => {
    const {name, price, categoryName} = req.body
    const product = new Product({ 
        name,
        price, 
        categoryName,
    })
    try {
        const savedProduct = await product.save()
        res.status(201).json(savedProduct)
    }
    catch (err) {
        res.status(500).json({
            error: err,
            isSuccessful: false,
        })
    }
}

const getAllProducts: RequestHandler = async (req, res) => {
    try{
        const allProducts = await Product.find()
        res.status(201).json(allProducts)
    }
    catch(err){
        res.status(500).json({
            error: err,
            isSuccessful: false,
        })
    }
}




