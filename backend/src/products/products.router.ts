import { NextFunction, Request, Response, Router } from "express";
import { ProductsController } from "./products.controller";

export const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productsController.getProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.get(
  "/category/:category",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = req.params.category;
      const products = await productsController.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);
