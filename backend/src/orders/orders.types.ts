import { Product } from "../products/porduct.types";

export type CartItem = Product & { quantity: number };
