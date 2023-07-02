import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/store");
  } catch (error) {
    console.log("Error connecting to DB");
    console.log(error)
  }
};
