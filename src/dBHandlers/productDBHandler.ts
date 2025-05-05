import { Product, IProduct } from "../models/productSchema"
import { CustomError } from "../errors/customError"
import mongoose from "mongoose"

export {getProductInDB}

type ObjectId = mongoose.Types.ObjectId


async function getProductInDB(productName: string | null, productId: ObjectId | null = null){
    if (productId && productName) throw new CustomError({message: "Neither productName nor productId is provided as na argument to getProductInDB", statusCode: 500})
    let product: IProduct | null = null

    if (productName) product = await Product.findOne().where("name").equals(productName) 
    else if (productId) product = await Product.findById(productId)

    if (!product) throw new CustomError({message: "Product is not found in DB", statusCode: 500})
    
    return product
}
