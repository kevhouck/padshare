import SocketIO from 'socket.io';
import express from 'express';
import http from 'http';
import DatabaseProxy from './persistence/RedisDatabaseProxy'
import cors from 'cors'
import morgan from 'morgan'
import { setupRoutes } from './networking/rest'

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = 3000

var namespaces = {}
var deltaDb = new DatabaseProxy()

app.use(morgan('combined'))
app.use(cors());

setupRoutes(app, io, deltaDb, namespaces)

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});
