import $ from 'jquery'

export default class GeneralProxy {
    constructor() {

    }

    createDocument(callback) {
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/document",
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
            url: "http://localhost:3000/document/" + documentId,
            success: (data, textStatus, res) => {
                callback(null, data)
            },
            error: (res, textStatus, errorThrown) => {
                callback(res, null)
            }
        })
    }
}