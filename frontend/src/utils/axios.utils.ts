import axios from "axios";

export const setupClientSideAxios = () => {
  axios.defaults.baseURL = "http://localhost:5000";
};

export const setAuthHeader = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
