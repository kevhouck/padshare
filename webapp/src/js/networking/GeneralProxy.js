import $ from 'jquery'
import {config} from '../config/config'

export default class GeneralProxy {
  constructor() {
    this.url = config.server.protocol + '://' + config.server.hostname + ':' + config.server.port
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
      url: this.url + '/api/document/' + documentId,
      success: (data, textStatus, res) => {
        callback(null, data)
      },
      error: (res, textStatus, errorThrown) => {
        callback(res, null)
      }
    })
  }
}
