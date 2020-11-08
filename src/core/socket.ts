import socket from 'socket.io';
import { Server as HttpServer } from 'http';
import createSocket, { Server as SocketServer } from 'socket.io';

export default class {
    ioInstance!: SocketServer;
    http: HttpServer;

    constructor(http: HttpServer) {
        this.http = http;
    }

    createInstance() {
        this.ioInstance = createSocket(this.http);
        this.socketListener();
        return this.ioInstance;
    }

    getInstance() {
        if (!this.ioInstance) {
            this.ioInstance = this.createInstance();
        }
        return this.ioInstance;
    }

    socketListener() {
        this.ioInstance.on('connection', (socket: socket.Socket) => {
            console.log('connected');
        })
    }
}
