require('../src/style/style.css')
require('./index.html') // require this so we can watch it
import Router from './js/routing'
import $ from 'jquery'

const router = new Router()

// this will be called if the page is loading for the first time or had a hard reload
router.route(window.location.hash)

// and bind to any changes
$(window).on('hashchange', () => {
    console.log('hashchange triggered')
    router.route(window.location.hash)
})