import Proxy from './networking'

export default class EditorController {
    constructor() {
        this.proxy = new Proxy()
        this.editor = new Quill('#editor', {
            theme: 'snow'
        });

        setupHooks(this.editor, this.proxy)

        this.proxy.connect()
    }
}


const setupHooks = (editor, proxy) => {
    // setup editor hooks
    editor.on('text-change', (delta, oldDocDelta, source) => {
        if (source === 'user') {
            proxy.sendDelta(delta)
        }
    });

    // setup proxy hooks
    proxy.onConnection(() => {
        console.log('connected')
    })

    proxy.onDeltaReceived((delta) => {
        console.log('delta\n', delta)
        editor.updateContents(delta)
    })

    proxy.onDisconnect(() => {
        console.log('disconnected')
    })
}


