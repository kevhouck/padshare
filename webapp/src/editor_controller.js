import Proxy from './networking'
import uuid from 'uuid'

export default class EditorController {
    constructor() {
        this.deltas = []
        this.proxy = new Proxy()
        this.editor = new Quill('#editor', {
            theme: 'snow'
        });

        setupHooks(this.editor, this.proxy, this.deltas)

        this.proxy.connect()
    }
}

/**
 * Sets up delegates to perfrom syncing logic. Is effectively a private method
 * @param editor
 * @param proxy
 * @param deltas
 */
const setupHooks = (editor, proxy, deltaMsgs) => {
    // setup editor hooks
    editor.on('text-change', (delta, oldDocDelta, source) => {
        if (source === 'user') {
            const deltaMsg = {
                id: uuid.v4(),
                delta: delta
            }
            deltaMsgs.push(deltaMsg)
            proxy.sendDelta(deltaMsg)
        }
    });

    // setup proxy hooks
    proxy.onConnection(() => {
        console.log('connected')
    })

    proxy.onDeltaReceived((deltaMsg) => {
        console.log(deltaMsg)
        if (!hasDeltaMsg(deltaMsgs, deltaMsg)) {
            editor.updateContents(deltaMsg.delta)
        }
    })

    proxy.onDisconnect(() => {
        console.log('disconnected')
    })
}

const hasDeltaMsg = (deltaMsgs, deltaMsg) => {
    for (const storedDeltaMsg of deltaMsgs) {
        if (storedDeltaMsg.id === deltaMsg.id) {
            return true
        }
    }
    return false
}

