import { checkSchema } from "express-validator";

export const createOrderValidator = checkSchema({
  cartItems: {
    isArray: true,
  },
  "orderItems.*.quantity": {
    isInt: true,
  },
  "orderItems.*.productId": {
    isString: true,
  },
  "orderItems.*.productName": {
    isString: true,
  },
  "orderItems.*.price": {
    isFloat: true,
  }
});
