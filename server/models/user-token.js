import { Schema, model } from "mongoose";

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, requaired: true },
});

export const modelToken = model("Token", UserSchema);
