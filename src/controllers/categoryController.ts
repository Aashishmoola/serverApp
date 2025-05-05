import { RequestHandler } from "express";
import { Category } from "../models/categorySchema";
import { CustomError } from "../errors/customError";
import asyncHandler from "express-async-handler" // wraps function in try catch block and passes any errors raised to next()

export {createCategory, getAllCategories, getCategory, updateCategory, deleteCategory, getCategoryInDB}

async function getCategoryInDB(categoryName: string) {
    const category = await Category.findOne().where("name").equals(categoryName)
    if (!category) throw new CustomError({message: `${categoryName} is not found.`, statusCode: 404})
    return category
}
const createCategory: RequestHandler = asyncHandler(async (req, res) => {
    // req.body is whatever you send in JSON format in req
    const {name, color, icon, image} = req.body
    const category = new Category({
        name, 
        color,
        icon, 
        image,
    })

    const savedCategory = await category.save()
    res.status(201).json(savedCategory)
})

const getCategory: RequestHandler = asyncHandler(async (req, res) => {

    const category = await getCategoryInDB(req.params.categoryName)
    res.status(201).json(category)
})



const getAllCategories: RequestHandler = asyncHandler(async (req, res) => {
    // Will return empty category if not found
    const allCategories = await Category.find()
    res.status(201).json(allCategories)
})

const updateCategory: RequestHandler = asyncHandler(async (req, res) => {
    const {name, color, icon, image} = req.body

    const category = await getCategoryInDB(req.params.categoryName)
    if (name) category.name = name
    if (color) category.color = color
    if (icon) category.icon = icon
    if (image) category.image = image

    category.save()
    res.status(201).json(category)
})

const deleteCategory: RequestHandler = asyncHandler(async (req, res) => {
    const categoryName = req.params.categoryName
    const deletedCategory = await Category.findOneAndDelete().where("name").equals(categoryName)
    if (!deletedCategory) throw new CustomError({message: `${categoryName} is not found.`, statusCode: 404})
    res.status(201).json(deletedCategory)
})


