import $ from 'jquery'
import config from '../config/config'

export default class GeneralProxy {
    constructor() {
        this.hostname = config.hostname
        this.port = config.port
        this.url = 'http://'+ this.hostname + ':' + this.port
    }

    createDocument(callback) {
        $.ajax({
            type: 'POST',
            url: this.url + '/document',
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
            url: this.url +  '/document' + documentId,
            success: (data, textStatus, res) => {
                callback(null, data)
            },
            error: (res, textStatus, errorThrown) => {
                callback(res, null)
            }
        })
    }
}