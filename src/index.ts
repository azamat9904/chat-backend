import { createServer } from 'http';
import Socket from './core/socket';
import express from 'express';
import dotenv from 'dotenv';
import './core/db';
import createRoutes from './core/routes';

dotenv.config();

const app = express();
const http = createServer(app);
const socket = new Socket(http);
const socketInstance = socket.createInstance();
createRoutes(app, socketInstance);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log('Started on port ' + port);
});
