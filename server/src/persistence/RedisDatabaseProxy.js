import redis from 'redis'

/**
 * Abstracts the connection to Redis.
 */
export default class RedisDatabaseProxy {
    constructor(hostname, port) {
        // connect to localhost port 6379
        this.redisClient = redis.createClient({
            host: hostname,
            port: port,
            retry_strategy: function (options) {
                if (options.error.code === 'ECONNREFUSED') {
                    // End reconnecting on a specific error and flush all commands with a individual error
                    return new Error('The server refused the connection');
                }
                if (options.total_retry_time > 1000 * 60 * 60) {
                    // End reconnecting after a specific timeout and flush all commands with a individual error
                    return new Error('Retry time exhausted');
                }

                // reconnect after
                return Math.max(options.attempt * 100, 3000);
            }
        })
    }

    /**
     * Creates a sentinel list entry in order for us to verify the document was created
     * @param documentId
     */
    createDocument(documentId, callback) {
        this.redisClient.rpush(documentId, 'document created', (err, res) => {
            callback(err, res)
        })
    }

    /**
     * Adds a delta message to the end of the list of delta messages
     * @param documentId The document it belongs to
     * @param deltaMessage The delta message
     */
    addDeltaMessage(documentId, deltaMessage) {
        // rpush appends it to the end of the list in O(1) time
        this.redisClient.rpush(documentId, JSON.stringify(deltaMessage))
    }

    /**
     * Retrieves all delta messages for the document. Operation is async so a callback is needed
     * @param documentId
     * @param callback The function to pass the delta messages to, along with an error if present
     */
    getDeltaMessages(documentId, callback) {
        // fetch entire list except for sentinel entry
        this.redisClient.lrange(documentId, 1, -1, (err, res) => {
            const deltaMessages = []
            for (let stringDeltaMessgage of res) {
                deltaMessages.push(JSON.parse(stringDeltaMessgage))
            }
            callback(err, deltaMessages)
        })
    }

    /**
     * Checks to see if the document exists
     * @param documentId The document we are interested in
     * @param callback The function to pass the boolean result to
     */
    doesDocumentExist(documentId, callback) {
        this.redisClient.exists(documentId, (err, res) => {
            const doesExist = res === 1
            callback(err, doesExist)
        })
    }
}