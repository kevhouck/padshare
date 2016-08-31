import GeneralProxy from '../networking/GeneralProxy'
import $ from 'jquery'
const MainPageView = require('../../views/MainPageView.html')
require('../../style/MainPageStyle.css')

export default class MainPageController {
    constructor() {
        console.log('Main page activeController')

        this.view = MainPageView

        // connect to general api
        this.proxy = new GeneralProxy()

    }

    getView() {
        return this.view
    }

    viewLoaded() {
        // setup event binding
        $('#create-doc-btn').click(() => {
            // creates a new document
            this.proxy.createDocument((err, data) => {
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
            this.proxy.loadDocument(documentId, (err, data) => {
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