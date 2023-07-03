import axios, { AxiosInstance } from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const createServerSideAxiosInstance = (
  context: GetServerSidePropsContext
): AxiosInstance => {
  const token = context.req.cookies.token;
  const axiosInstance = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "http://backend:5000"
        : "http://localhost:5000",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return axiosInstance;
};
