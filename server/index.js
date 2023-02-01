import * as dotenv from "dotenv";
import express from "express";
import expressWs from "express-ws";
import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./route/index.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const init = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DB_URL);

    app.listen(PORT, () => console.log(PORT));
  } catch (error) {
    console.log(error);
  }
};

init();
