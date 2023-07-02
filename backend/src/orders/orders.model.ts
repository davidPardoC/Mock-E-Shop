import mongoose, { Schema } from "mongoose";

export type Order = {
  userId: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  rating?: number;
  active?: boolean;
  completed?: boolean;
  currency?: string;
};

const OrderSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true },
  items: [
    {
      productId: { type: Number, required: true },
      productName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  rating: { type: Number, required: false, default: 0 },
  active: { type: Boolean, required: false, default: true },
  completed: { type: Boolean, required: false },
  currency: { type: String, required: false, default: "USD" },
  creationDate: { type: Date, required: false, default: Date.now },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
