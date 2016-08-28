import SocketIO from 'socket.io';
import express from 'express';
import http from 'http';

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);

const port = 3000

var clients = []

io.on('connection', (socket) => {
    clients.push(socket)

    socket.on('delta', (delta) => {
        for (const client of clients) {
            client.emit('delta', delta)
        }
    })
});

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});