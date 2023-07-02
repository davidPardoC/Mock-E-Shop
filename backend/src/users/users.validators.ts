import { checkSchema } from "express-validator";

export const emailPasswordValidator = checkSchema({
  email: { isEmail: true },
  password: { isString: true },
});
