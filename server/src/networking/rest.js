import uuid from 'uuid';
import { setupNamespace } from './realtime'

export const setupRoutes = (app, io, database, namespaces, logger) => {
    /**
     * Creates the a new document and returns its id
     */
    app.post('/api/document', (req, res) => {
        // create namespace
        const id = uuid.v4()
        const namespace = io.of('/' + id)
        setupNamespace(namespace, database, logger)
        namespaces[id] = namespace
        database.createDocument(id, (err) => {
            if (err) {
                res.sendStatus(500)
                logger.log('ERROR', "Create document failed due to db")
                return
            }
            res.send({ documentId: id })
        })
    })

    /**
     * Verifies that the document exists, and if so verifies a namespace exists for it
     */
    app.get('/api/document/:documentId', (req, res) => {
        const { documentId } = req.params
        if (documentId) {
            database.doesDocumentExist(documentId, (err, doesExist) => {
                if (err || doesExist === false) {
                    res.sendStatus(404)
                    return
                }

                if (!namespaces[documentId]) {
                    const namespace = io.of('/' + documentId)
                    setupNamespace(namespace, database, logger)
                    namespaces[documentId] = namespace
                }
                res.send({ documentId: documentId })
            })
        } else {
            res.sendStatus(400)
        }
    })
}
