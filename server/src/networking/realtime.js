export const setupNamespace = (namespace, database, logger) => {
    namespace.on('connection', (socket) => {
        logger.log('INFO', 'User connected')

        database.getDeltaMessages(namespace.name.replace('/', ''), (err, deltaMessages) => {
            if (err) {
                return
            }

            for (const deltaMessage of deltaMessages) {
                socket.emit('delta', deltaMessage)
            }
        })

        socket.on('delta', (deltaMessage) => {
            logger.log('INFO', 'Received delta message ' + JSON.stringify(deltaMessage))
            database.addDeltaMessage(namespace.name.replace('/', ''), deltaMessage)
            socket.nsp.emit('delta', deltaMessage)
        })

        socket.on('disconnect', () => {
            logger.log('INFO', 'User disconnected')
        })
    })
}