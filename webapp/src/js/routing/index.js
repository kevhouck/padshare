import EditorController from '../controllers/EditorController'
import MainPageController from '../controllers/MainPageController'
import $ from 'jquery'
import _ from 'lodash'

export default class Router {
    constructor() {
        this.activeController = null
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
                    window.location.hash = "/#"
                }

                $('#main-page').hide()
                $('#document-page').show()
            } catch (e) {
                console.log(e)
                // go back to main
                window.location.hash = "/#"
            }
        } else if (path === '#/') {
            if (this.activeController) {
                this.activeController.tearDown()
            }
            this.activeController = new MainPageController()

            $('#main-page').show()
            $('#document-page').hide()
        } else {
            // redirect
            window.location.hash = "#/"
        }
    }

}