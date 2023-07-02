import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./users.controller";
import { UserModel } from "./user.model";
import { emailPasswordValidator } from "./users.validators";
import { validationResult } from "express-validator";
import { StatusCodes } from "../enums";
import { BadRequestException } from "../errors";

export const usersRouter = Router();

const userController = new UserController(UserModel);

usersRouter.post(
  "",
  emailPasswordValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        throw BadRequestException(result.array());
      }

      const { email, password } = req.body;
      const newUser = await userController.createUser(email, password);
      return res.status(StatusCodes.Created).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.post(
  "/login",
  emailPasswordValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        throw BadRequestException(result.array());
      }
      const { email, password } = req.body;
      const session = await userController.loginUser(email, password);
      return res.status(StatusCodes.Ok).json(session);
    } catch (error) {
      next(error);
    }
  }
);
