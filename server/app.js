import SocketIO from 'socket.io';
import express from 'express';
import http from 'http';

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);

io.on('connection', (socket) => {
    socket.emit('hello')
});

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});