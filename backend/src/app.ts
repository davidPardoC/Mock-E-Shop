import express, { json } from "express";
import { usersRouter } from "./users/users.routes";
import { connectDb } from "./database";
import { errorHandler } from "./errorHandler";
import cors from 'cors'
import { productsRouter } from "./products/products.router";
import cookieParser from 'cookie-parser'
import { ordersRouter } from "./orders/orders.router";
import { authMiddleWare } from "./middlewares/auth.middleware";

const app = express()

app.use(cors())
app.use(json())
app.use(cookieParser());
app.use("/users/", usersRouter)
app.use("/products/", productsRouter)
app.use("/orders/", authMiddleWare, ordersRouter)
app.use(errorHandler)

export const startExpressApp = async (port:number) => {
    await connectDb()
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
}