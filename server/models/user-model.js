import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, requaired: true },
  password: { type: String, requaired: true },
});

export const modelUser = model("User", UserSchema);
