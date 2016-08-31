import uuid from 'uuid';
import { setupNamespace } from './realtime'

export const setupRoutes = (app, io, deltaDb, namespaces) => {
    /**
     * Creates the a new document and returns its id
     */
    app.post('/document', (req, res) => {
        // create namespace
        const id = uuid.v4()
        const namespace = io.of('/' + id)
        setupNamespace(namespace, deltaDb)
        namespaces[id] = namespace
        deltaDb.createDocument(id, (err) => {
            if (err) {
                res.sendStatus(500)
                return
            }
            res.send({ documentId: id })
        })
    })

    /**
     * Verifies that the document exists, and if so verifies a namespace exists for it
     */
    app.get('/document/:documentId', (req, res) => {
        const { documentId } = req.params
        if (documentId) {
            deltaDb.doesDocumentExist(documentId, (err, doesExist) => {
                if (err || doesExist === false) {
                    res.sendStatus(404)
                    return
                }

                if (!namespaces[documentId]) {
                    const namespace = io.of('/' + documentId)
                    setupNamespace(namespace, deltaDb)
                    namespaces[documentId] = namespace
                }
                res.send({ documentId: documentId })
            })
        } else {
            res.sendStatus(400)
        }
    })
}
