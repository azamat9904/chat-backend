import { createServer } from 'http';
import createSocket from 'socket.io';
import app from './routes/app';
import './core/db';


const http = createServer(app);
const io = createSocket(http);

const port = process.env.PORT || 3000;

http.listen(port);
