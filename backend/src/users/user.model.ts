import { Schema, model } from "mongoose";

export type User = {
  email: string;
  password: string;
};

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);
