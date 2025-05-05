import { Order, IOrder, IOrderItems } from "../models/orderSchema"
import asyncHandler from "express-async-handler"
import { CustomError } from "../errors/customError"
import { RequestHandler } from "express"


const createOrder: RequestHandler = asyncHandler( async (req, res) => {
    const userEmail = req.userEmail
    if (!userEmail) throw new CustomError({message: " UserEmail from JWT payload has unsuccessfully been attatched to req obj", statusCode: 500})

    const {orderItems}: {orderItems: IOrderItems} = req.body
    const {productname}

    // Check if PhoneNum and shippingAdrress defaults exist in user model 
    // and if flag is true in queryParams 

    // Get unit price of product and calc totalPrice
})

const updateOrder: RequestHandler = asyncHandler( async (req, res) => {
    
    // Check status to see if order can be updated
})

const deleteOrder: RequestHandler = asyncHandler( async (req, res) => {
})

const getOrder: RequestHandler = asyncHandler( async (req, res) => {
})

const getAllOrders: RequestHandler = asyncHandler( async (req, res) => {
})






