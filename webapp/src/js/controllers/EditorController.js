import DocumentProxy from '../networking/DocumentProxy'
import GeneralProxy from '../networking/GeneralProxy'
import uuid from 'uuid'
import $ from 'jquery'
const EditorView = require('../../views/EditorView.html')
require('../../style/EditorStyle.css')

export default class EditorController {
  constructor(documentId) {
    console.log('Editor Controller')
    this.view = EditorView
    this.documentId = documentId
    this.deltas = []
  }

  getView() {
    return this.view
  }

  viewLoaded() {
    this.editor = new Quill('#editor', {
      theme: 'snow'
    });

    this.generalProxy = new GeneralProxy()
    this.generalProxy.loadDocument(this.documentId, (err, res) => {
      console.log(res)
      if (err) {
        throw new Error()
      }

      this.proxy = new DocumentProxy(this.documentId)
      setupHooks(this.editor, this.proxy, this.deltas)
      this.proxy.connect()
    })
  }

  tearDown() {
    // remove editor
    $('#editor').replaceWith('<div id="editor"></div>')
    // remove editor toolbar
    $('.ql-toolbar').remove()
  }
}

/**
 * Sets up delegates to perfrom syncing logic. Is effectively a private method
 * @param editor
 * @param proxy
 * @param delta
 */
const setupHooks = (editor, proxy, deltaMsgs) => {
  // setup editor hooks
  editor.on('text-change', (delta, oldDocDelta, source) => {
    if (source === 'user') {
      const deltaMsg = {
        id: uuid.v4(),
        delta: delta
      }
      console.log('sent delta')
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

