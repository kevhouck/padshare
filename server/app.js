import SocketIO from 'socket.io';
import express from 'express';
import http from 'http';

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);

const port = 3000

var clients = []
var deltaMsgs =[]

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        socket.removeAllListeners('delta')
    })

    clients.push(socket)

    for(const deltaMsg of deltaMsgs) {
        socket.emit('delta', deltaMsg)
    }

    socket.on('delta', (deltaMsg) => {
        deltaMsgs.push(deltaMsg)

        for (const client of clients) {
            client.emit('delta', deltaMsg)
        }
    })
});

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});