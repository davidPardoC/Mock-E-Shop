import { StatusCodes } from "./enums";

export class CustomError extends Error {
  stack?: any;
  status: number;

  constructor(message: string, status: number = 500, stack: any) {
    super();
    this.message = message;
    this.status = status;
    this.stack = stack;
  }
}

export const BadRequestException = (stack: any, message = "Bad Request") => {
  return new CustomError(message, StatusCodes.BadRequest, stack);
};

export const NotFoudException = ({message = "Not Found", stack}:{message?:string, stack?:any}) => {
  return new CustomError(message, StatusCodes.NotFoud, stack);
};

export const UnAuthorizedException = ({message = "UnAuthorized", stack}:{message?:string, stack?:any}) => {
  return new CustomError(message, StatusCodes.UnAuthorized, stack);
};