import $ from 'jquery'
import { config } from '../config/config'

export default class GeneralProxy {
    constructor() {
        this.hostname = config.server.hostname
        this.port = config.server.port
        this.url = 'http://'+ this.hostname + ':' + this.port
    }

    createDocument(callback) {
        $.ajax({
            type: 'POST',
            url: this.url + '/api/document',
            success: (data, textStatus, res) => {
                callback(null, data)
            },
            error: (res, textStatus, errorThrown) => {
                callback(res, null)
            }
        })
    }

    loadDocument(documentId, callback) {
        $.ajax({
            type: "GET",
            url: this.url +  '/api/document' + documentId,
            success: (data, textStatus, res) => {
                callback(null, data)
            },
            error: (res, textStatus, errorThrown) => {
                callback(res, null)
            }
        })
    }
}
