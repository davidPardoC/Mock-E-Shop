import { AxiosInstance } from "axios";

const getProducts = async (axiosInstance: AxiosInstance, category = "") => {
  const url =
    category && category != "All"
      ? `/products/category/${category}`
      : "/products";
  const { data } = await axiosInstance.get(url);
  return data;
};

export const ProductServices = { getProducts };
