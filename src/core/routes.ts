import express from 'express';
import bodyParser from "body-parser";
import { updateLastSeen, checkAuth } from '../midllewares';
import socket from "socket.io";
import {
    getDialogRoutes,
    getMessageRoutes,
    getUserRoutes
} from '../routes';

import {
    UserController,
    MessageController,
    DialogController
} from '../controllers/index';



export default (app: express.Express, io: socket.Server) => {
    const userController = new UserController(io);
    const dialogController = new DialogController(io);
    const messageController = new MessageController(io);

    app.use(bodyParser.json());
    app.use(updateLastSeen);
    app.use(checkAuth);

    app.use("/users", getUserRoutes(userController));
    app.use('/dialogs', getDialogRoutes(dialogController));
    app.use('/messages', getMessageRoutes(messageController));
};