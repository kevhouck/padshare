export default class InMemDatabaseProxy {
    constructor() {
        this.deltaMessages = []
    }

    addDocument(documentId) {
        this.deltaMessages[documentId] = []
    }

    addDeltaMessage(documentId, deltaMessage) {
        this.deltaMessages[documentId].push(deltaMessage)
    }

    getDeltaMessages(documentId) {
        return this.deltaMessages[documentId]
    }

    doesDocumentExist(documentId) {
        return (!!this.deltaMessages[documentId])
    }
}