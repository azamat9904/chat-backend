import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { userRoutes } from "./routes/index";

const app = express();
const port = 4200;

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use("/users", userRoutes);

app.listen(port);
