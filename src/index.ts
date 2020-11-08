import { createServer } from 'http';
import Socket from './core/socketIO';
import express from 'express';
import dotenv from 'dotenv';
import './core/db';
import createRoutes from './core/routes';

dotenv.config();

const app = express();
const http = createServer(app);
const socket = new Socket(http);
const socketInstance = socket.createInstance();
socketInstance.on('connection', () => {
  console.log('connected');
})
createRoutes(app, socketInstance);

const port = process.env.PORT || 3000;

http.listen(port);
