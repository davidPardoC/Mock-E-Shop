import axios from "axios";
import { Product } from "./porduct.types";

export class ProductsController {
  private productsApi: string = "https://fakestoreapi.com/products";

  async getProducts():Promise<Product[]> {
    const { data } = await axios.get<Product[]>(this.productsApi);
    return data;
  }
}
