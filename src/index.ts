import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import { updateLastSeen, checkAuth } from './midllewares/index';
import {
  userRoutes,
  dialogRoutes,
  messageRoutes
} from "./routes/index";


const app = express();
dotenv.config();

mongoose.connect("mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

app.use("/users", userRoutes);
app.use('/dialogs', dialogRoutes);
app.use('/messages', messageRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on the port ' + port)
});
