import { AxiosInstance } from "axios";

const getProducts = async (axiosInstance:AxiosInstance) => {
    const { data } = await axiosInstance.get("/products");
    return data;
}

export const ProductServices = {getProducts}