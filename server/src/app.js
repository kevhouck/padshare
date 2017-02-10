import SocketIO from 'socket.io';
import express from 'express';
import http from 'http';
import DatabaseProxy from './persistence/RedisDatabaseProxy'
import cors from 'cors'
import morgan from 'morgan'
import { setupRoutes } from './networking/rest'
import config from './config'
import Logger from './logging/logger'

const logger = new Logger(config.logging.verbosity)
let app = express();
let io = new SocketIO(server);

var namespaces = {}
var database = new DatabaseProxy(config.redis.hostname, config.redis.port, logger)

app.use(morgan('combined'))
app.use(cors());

setupRoutes(app, io, database, namespaces, logger)

http.createServer(app).listen(80)
if (config.node_env === 'production' && config.https === true) {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/padshare.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/padshare.io/cert.pem')
  }
  https.createServer(options, app).listen(443)
}
