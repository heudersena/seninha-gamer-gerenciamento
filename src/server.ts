import "dotenv/config"
import express, { Request, Response, NextFunction } from "express"

import http from "http"
import cors from "cors"
import { Server } from 'socket.io';

import { router } from "./routers"
import { AppError } from "./utils/AppError"

const app = express()
app.use(express.json())
app.use(cors())

app.use((request: Request, response: Response, next: NextFunction) => {
    request.io = io
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE, HEAD, PATH")
    response.header("Access-Control-Allow-Headers", "*")
    next()
})
const serverHttp = http.createServer(app);



const io = new Server(serverHttp, {
    cors: {
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATH"]
    }
});

app.use(router)

// @ts-ignore
serverHttp.listen(process.env.PORT || 4007, "0.0.0.0", () => {
    console.log(`server running... 🐱‍🏍 http://0.0.0.0:${process.env.PORT}`)
})