import { CartItem } from "@/stores/cartStore";
import { User } from "@/stores/userStore";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

export const isClient = typeof window !== "undefined";
export const isNode = !isClient;

export const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const getCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    return JSON.parse(cartItems);
  }
  return [];
};

export const removeCartItemsFromLocalStorage = () => {
  localStorage.removeItem("cartItems");
};

export const decodeToken = () => {
  const token = getCookie("token");
  if (!token) return null;
  return jwtDecode<User>(token.toString());
};

export const getCurrecySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "LMP":
      return "L";
    default:
      return "$";
  }
};

export const formatCurrecy = (currency: string, price: number) => {
  switch (currency) {
    case "USD":
      const usdFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return usdFormatter.format(price * 1);
    case "EUR":
      const eurFormater = new Intl.NumberFormat("en-ES", {
        style: "currency",
        currency: "EUR",
      });
      return eurFormater.format(price * 1.07);
    case "HNL":
      const lmpFormater = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "HNL",
      });
      return lmpFormater.format(price * 24);
    default:
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(price * 1);
  }
};
