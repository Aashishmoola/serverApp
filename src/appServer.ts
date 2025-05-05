import express from "express";
import dotenv from "dotenv"

dotenv.config({path: ".env"})

import bodyParser from "body-parser";
import mongoose from "mongoose"
import { getDotenVar } from "./helpers/dotenv";
import { productsRouter } from "./routes/productsRouter";
import { categoryRouter } from "./routes/categoryRouter";
import { errorHandler } from "./errors/errorHandler";
import { usersRouter } from "./routes/usersRouter";
import { globalVerifyJWToken } from "./middlewares/authMiddleware";


const app = express()

const API_URL = getDotenVar("API_URL")
const PORT = getDotenVar("PORT")
const TEMP_API_URL = `http://localhost:${PORT}${API_URL}`
const SERVER_CONNECTION = getDotenVar("SERVER_CONNECTION")

async function connectToServer(){
    try {
        await mongoose.connect(SERVER_CONNECTION)
        console.log("Connected to Server(DBType: MongoDB, clusterName: clusterStore, DB: EshopStore)")
    }
    catch(err) {
        console.error(err)
    }
}

// Paths must start with a "/" to be considered valid

function main() {
    connectToServer()

    app.use(bodyParser.json())  // Parsing the body in req as a JSON

    app.use(globalVerifyJWToken)

    app.use(`${API_URL}/products`, productsRouter)
    app.use(`${API_URL}/category`, categoryRouter)
    app.use(`${API_URL}/users`, usersRouter)

    app.get(`${API_URL}/test`, (req, res) => {
        res.json("Server test successful")
    })

    app.use(errorHandler)

    app.listen(PORT, ()=> {
        console.log(`Server is running at ${TEMP_API_URL}`)
    })
}


main()
