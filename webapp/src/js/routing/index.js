import EditorController from '../controllers/EditorController'
import GeneralProxy from '../networking/GeneralProxy'
import $ from 'jquery'
import _ from 'lodash'

export default class Router {
  constructor() {
    this.activeController = null
    this.activeView = $('#active-view')
    this.proxy = new GeneralProxy()
  }

  route(path) {
    console.log('routing')
    console.log(path)
    if (_.startsWith(path, "#/document/")) {
      try {
        if (this.activeController) {
          this.activeController.tearDown()
        }

        const splitLocation = path.split('/')
        if (splitLocation.length === 3) {
          const documentId = splitLocation[2]
          this.activeController = new EditorController(documentId)
        } else {
          window.location.hash = ""
        }

        this.activeView.empty().append($(this.activeController.getView()))
        this.activeController.viewLoaded()

      } catch (e) {
        console.log(e)
        // go back to main
        window.location.hash = ""
      }
    } else if (path === '') {
      if (this.activeController) {
        this.activeController.tearDown()
      }
      // creates a new document
      this.proxy.createDocument((err, data) => {
        if (err) {
          console.log('Could not create new document')
          throw new Error('Look\'s like we can\'t seem to connect to the API...')
        }
        window.location.hash = "/document/" + data.documentId
      })
    }
  }

}