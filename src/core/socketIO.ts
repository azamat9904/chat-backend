import { Server as HttpServer } from 'http';
import createSocket, { Server as SocketServer } from 'socket.io';

export default class {
    ioInstance!: SocketServer;
    http: HttpServer;

    constructor(http: HttpServer) {
        this.http = http;
    }

    createInstance() {
        const socket = createSocket(this.http);
        return socket;
    }

    getInstance() {
        if (!this.ioInstance) {
            this.ioInstance = this.createInstance();
        }
        return this.ioInstance;
    }
}
