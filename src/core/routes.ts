import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { updateLastSeen, checkAuth } from '../midllewares';
import {
    userRoutes,
    dialogRoutes,
    messageRoutes
} from '../routes';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(updateLastSeen);
app.use(checkAuth);

app.use("/users", userRoutes);
app.use('/dialogs', dialogRoutes);
app.use('/messages', messageRoutes);

export default app;