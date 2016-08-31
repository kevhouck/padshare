import GeneralProxy from '../utils/GeneralProxy'
import $ from 'jquery'

export default class MainPageController {
    constructor() {
        console.log('Main page activeController')

        // connect to general api
        const proxy = new GeneralProxy()

        // setup event binding
        $('#create-doc-btn').click(() => {
            // creates a new document
            proxy.createDocument((err, data) => {
                if(err) {
                    console.log('Could not create new document')
                    return
                }
                window.location.hash = "#/document/" + data.documentId
            })
        })
        $('#select-doc-btn').click(() => {
            const documentId = $('#document-id-textfield').val()
            // verifies the document exists and that a namespace for it exists
            proxy.loadDocument(documentId, (err, data) => {
                if(err) {
                    console.log('Could not select document')
                    alert('Could not select document')
                    return
                }
                window.location.hash = "#/document/" + data.documentId
            })
        })
    }

    tearDown() {
        $('#select-doc-btn').unbind()
        $('#create-doc-btn').unbind()
    }
}