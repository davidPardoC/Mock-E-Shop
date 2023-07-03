import { Product } from "@/types/product.types";
import { StoreApi, UseBoundStore, create } from "zustand";

type ProductsStore = {
  myProducts: Product[];
  setProducts: (products: Product[]) => void;
};

export const createProducstStore = (
  myProducts: Product[]
): UseBoundStore<StoreApi<ProductsStore>> => {
  return create<ProductsStore>((set) => ({
    myProducts,
    setProducts: (myProducts: Product[]) => set({ myProducts }),
  }));
};
