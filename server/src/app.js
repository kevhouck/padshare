import SocketIO from 'socket.io';
import express from 'express';
import http from 'http';
import DatabaseProxy from './persistence/RedisDatabaseProxy'
import cors from 'cors'
import morgan from 'morgan'
import { setupRoutes } from './networking/rest'
import config from './config'
import Logger from './logging/logger'
import path from 'path'

const logger = new Logger(config.logging.verbosity)
let app = express();
let server = http.Server(app);
let io = new SocketIO(server);

var namespaces = {}
var database = new DatabaseProxy(config.redis.hostname, config.redis.port, logger)

app.use(morgan('combined'))
app.use(cors());

setupRoutes(app, io, database, namespaces, logger)

server.listen(config.web.port, config.web.hostname, () => {
    logger.log('INFO',  'Listening on ' + config.web.hostname +':' + config.web.port);
});
