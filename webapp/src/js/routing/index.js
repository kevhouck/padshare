import EditorController from '../controllers/EditorController'
import MainPageController from '../controllers/MainPageController'
import $ from 'jquery'
import _ from 'lodash'

export default class Router {
    constructor() {
        this.activeController = null
        this.activeView = $('#active-view')
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


                this.activeView.empty().append($(this.activeController.getView()))
                this.activeController.viewLoaded()

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


            this.activeView.empty().append($(this.activeController.getView()))
            this.activeController.viewLoaded()

        } else {
            // redirect
            window.location.hash = "#/"
        }
    }

}