import { NextFunction, Request, Response, Router } from "express";
import { authMiddleWare } from "../middlewares/auth.middleware";
import { OrdersController } from "./orders.controller";
import { Order, OrderModel } from "./orders.model";
import { Model } from "mongoose";
import { createOrderValidator } from "./orders.validator";
import { StatusCodes } from "../enums";
import { validationResult } from "express-validator";
import { BadRequestException } from "../errors";

export const ordersRouter = Router();
const ordersController = new OrdersController(
  OrderModel as unknown as Model<Order>
);

ordersRouter.get("/", async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    const orders = await ordersController.getOrders(userId);
    console.log(orders);
    res.status(StatusCodes.Ok).json(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post(
  "/",
  createOrderValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        throw BadRequestException(result.array());
      }
      const userId = res.locals.user._id;
      await ordersController.createOrder({
        userId,
        cartItems: req.body.cartItems,
      });
      res.status(StatusCodes.Created).json({ message: "Order created" });
    } catch (error) {
      next(error);
    }
  }
);

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await ordersController.getOrder(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});


ordersRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await ordersController.updateOrder(id, req.body);
    res.json({ message: "Order updated" });
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:id/pay", async (req, res, next) => {
  try {
    await ordersController.payOrder(req.params.id);
    res.json({ message: "Order paid" });
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:id/rate", async (req, res, next) => {
  try {
    await ordersController.rateOrder(req.params.id, req.body.rating);
    res.json({ message: "Order paid" });
  } catch (error) {
    next(error);
  }
});
