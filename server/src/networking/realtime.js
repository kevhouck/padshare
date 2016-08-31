export const setupNamespace = (namespace, deltaDb) => {
    namespace.on('connection', (socket) => {
        console.log('user connected')

        deltaDb.getDeltaMessages(namespace.name.replace('/', ''), (err, deltaMessages) => {
            if (err) {
                return
            }

            for (const deltaMessage of deltaMessages) {
                socket.emit('delta', deltaMessage)
            }
        })

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