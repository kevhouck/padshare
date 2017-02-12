import io from 'socket.io-client'
import {config} from '../config/config'

/**
 * Abstraction for the connection to the backend. Uses delegate methods to hide the protocol we are using
 */
export default class DocumentProxy {
  constructor(documentId) {
    this.documentId = documentId
  }

  connect() {
    // connect to backend
    this.socket = io(config.server.protocol + '://' + config.server.hostname + ':' + config.server.port + '/' + this.documentId)

    // setup socket messages callbacks
    this.socket.on('connect', () => {
      if (this.connected) {
        this.connected()
      }
    })

    this.socket.on('delta', (deltaMsg) => {
      if (this.receivedDelta) {
        this.receivedDelta(deltaMsg)
      }
    })

    this.socket.on('disconnect', () => {
      if (this.disconnected) {
        this.disconnected()
      }
    })
  }


  /**
   * Sets up the function to call when a delta is received
   * @param delegate function to call
   */
  onDeltaReceived(delegate) {
    this.receivedDelta = delegate
  }

  /**
   * Sends a delta to the backend
   */
  sendDelta(delta) {
    this.socket.emit('delta', delta)
  }

  /**
   * Sets up the function to call when we connect
   * @param delegate function to call
   */
  onConnection(delegate) {
    this.connected = delegate
  }

  /**
   * Sets up the function to call if we disconnect from the client
   * @param delegate function to call
   */
  onDisconnect(delegate) {
    this.disconnected = delegate
  }

}