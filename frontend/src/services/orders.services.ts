import { Order } from "@/pages/orders/[id]";
import { CartItem } from "@/stores/cartStore";
import axios, { AxiosInstance } from "axios";

const createOrder = async (cartItems: CartItem[]) => {
  let mappedCartItems = cartItems.map((item) => ({
    productId: item.id,
    productName: item.title,
    ...item,
  }));
  await axios.post("/orders/", { cartItems: mappedCartItems });
};

const getOrders = async (axiosInstance: AxiosInstance) => {
  const response = await axiosInstance.get("/orders/");
  return response.data;
};

const getOrderById = async (axiosInstance: AxiosInstance, orderId: string) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};

const payOrder = async (axiosInstance: AxiosInstance, orderId: string) => {
  const response = await axiosInstance.patch(`/orders/${orderId}/pay`);
  return response.data;
};

const updateOrder = async (
  axiosInstance: AxiosInstance,
  orderId: string,
  order: Order
) => {
  const response = await axiosInstance.put(`/orders/${orderId}`, order);
  return response.data;
};

const rateOrder = async (
  axiosInstance: AxiosInstance,
  orderId: string,
  rating: number
) => {
  const response = await axiosInstance.patch(`/orders/${orderId}/rate`, {
    rating,
  });
  return response.data;
};

export const OrdersService = {
  createOrder,
  getOrders,
  getOrderById,
  payOrder,
  updateOrder,
  rateOrder,
};
