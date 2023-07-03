import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const url = (process.env.NODE_ENV = "production"
      ? "mongodb://mongodb:27017/store"
      : "mongodb://127.0.0.1:27017/store");
    mongoose.connect(url);
  } catch (error) {
    console.log("Error connecting to DB");
    console.log(error);
  }
};
