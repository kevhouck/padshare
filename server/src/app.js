import SocketIO from 'socket.io'
import express from 'express'
import http from 'http'
import https from 'https'
import DatabaseProxy from './persistence/RedisDatabaseProxy'
import cors from 'cors'
import morgan from 'morgan'
import { setupRoutes } from './networking/rest'
import config from './config'
import Logger from './logging/logger'

console.log(process.env)

let app = express();
let server = null
if (config.https === 'true') {
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/padshare.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/padshare.io/cert.pem')
  }
  console.log('Creating https server...')
  server = https.createServer(options, app)
} else {
  console.log('Creating http server...')
  server = http.createServer(app)
}

const logger = new Logger(config.logging.verbosity)
let io = new SocketIO(server);

let namespaces = {}
let database = new DatabaseProxy(config.redis.hostname, config.redis.port, logger)

app.use(morgan('combined'))
app.use(cors());

setupRoutes(app, io, database, namespaces, logger)

server.listen(3000)
console.log('listening on port 3000')