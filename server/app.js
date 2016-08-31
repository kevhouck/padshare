import SocketIO from 'socket.io';
import express from 'express';
import http from 'http';
import uuid from 'uuid';
import DatabaseProxy from './InMemDatabaseProxy'
import cors from 'cors'
import morgan from 'morgan'

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = 3000

var namespaces = {}
var deltaDb = new DatabaseProxy()

app.use(morgan('combined'))
app.use(cors());

/**
 * Creates the a new document and returns its id
 */
app.post('/document', (req, res) => {
    // create namespace
    const id = uuid.v4()
    const namespace = io.of('/' + id)
    setupNamespace(namespace)
    namespaces[id] = namespace
    deltaDb.addDocument(id)
    res.send({ documentId: id })
})

/**
 * Verifies that the document exists, and if so verifies a namespace exists for it
 */
app.get('/document/:documentId', (req, res) => {
    const { documentId } = req.params
    if (documentId) {
        if (deltaDb.doesDocumentExist(documentId)) {
            if (!namespaces[documentId]) {
                const namespace = io.of('/' + documentId)
                setupNamespace(namespace)
                namespaces[documentId] = namespace
            }
            res.send({ documentId: documentId })
            return
        }
        res.sendStatus(404)
        return
    }
    res.sendStatus(400)
})

server.listen(port, () => {
    console.log('[INFO] Listening on *:' + port);
});

const setupNamespace = (namespace) => {
    namespace.on('connection', (socket) => {
        console.log('user connected')

        const deltaMessages = deltaDb.getDeltaMessages(namespace.name.replace('/', ''))

        for (const deltaMessage of deltaMessages) {
            socket.emit('delta', deltaMessage)
        }

        socket.on('delta', (deltaMessage) => {
            console.log('received delta')
            deltaDb.addDeltaMessage(namespace.name.replace('/', ''), deltaMessage)
            socket.nsp.emit('delta', deltaMessage)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}