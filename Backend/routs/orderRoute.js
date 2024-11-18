import express from "express"
import authMiddleware from "../middleware/Auth.js"
import { listOrder, placeOrder, updateStatus, userOrder, VerifyOrder } from "../Controller/OrderController.js"


const orderRouter = express.Router()
orderRouter.post("/place",authMiddleware,placeOrder)

orderRouter.post("/verify",VerifyOrder)
orderRouter.post("/userorder",authMiddleware,userOrder)
orderRouter.get("/list",listOrder)
orderRouter.post("/status",updateStatus)

export default orderRouter
