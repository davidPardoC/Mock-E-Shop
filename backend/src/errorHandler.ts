import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const { message, stack } = error;
  res.status(status).json({ message, description:stack });
};
