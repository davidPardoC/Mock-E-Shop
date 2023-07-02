import { Model } from "mongoose";
import { Order } from "./orders.model";
import { CartItem } from "./orders.types";
import { NotFoudException } from "../errors";

export class OrdersController {
  private orderModel: Model<Order>;

  constructor(OrderModel: Model<Order>) {
    this.orderModel = OrderModel;
  }

  getOrders(userId: string) {
    return this.orderModel.find({ userId });
  }

  createOrder({
    cartItems,
    userId,
  }: {
    cartItems: CartItem[];
    userId: string;
  }) {
    const newOrder = new this.orderModel({ items: cartItems, userId });
    newOrder.save();
  }

  async updateOrder(orderId: string, updatedOrder: Order) {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw NotFoudException({});
    }
    order.items = updatedOrder.items;
    order.currency = updatedOrder.currency;
    await order.save();
  }

  getOrder(id: string) {
    return this.orderModel.findById(id);
  }

  async payOrder(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw NotFoudException({});
    }
    order.active = false;
    order.save();
  }

  async rateOrder(id: string, rating: number) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw NotFoudException({});
    }
    order.rating = rating;
    await order.save();
  }
}
