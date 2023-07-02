import { Product } from "@/types/product.types";
import { removeCartItemsFromLocalStorage, saveCartToLocalStorage } from "@/utils/common.utils";
import { create } from "zustand";

interface CartState {
  cartItems: CartItem[];
  addItemsToCart: (item: Product) => void;
  clearCart: () => void;
  setCartItems: (cartItems: CartItem[]) => void;
}

export type CartItem = Product & { quantity: number };

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addItemsToCart: (item: Product) =>
    set((state) => {
      const itemExists = get().cartItems.findIndex(
        (product) => product.id === item.id
      );

      let cartItems: CartItem[] = [];

      if (itemExists !== -1) {
        cartItems = get().cartItems.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        return { ...state, cartItems };
      }

      cartItems = [...get().cartItems, { ...item, quantity: 1 }];
      saveCartToLocalStorage(cartItems);
      return { ...state, cartItems };
    }),

  clearCart: () =>
    set((state: any) => {
      removeCartItemsFromLocalStorage();
      return { cartItems: [] };
    }),

  setCartItems: (cartItems: CartItem[]) => set({ cartItems }),
}));
