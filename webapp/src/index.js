import Router from './js/routing'
import $ from 'jquery'
require('./style/index.css')
const router = new Router()

$(document).ready(() => {
    console.log('document ready')
    // this will be called if the page is loading for the first time or had a hard reload
    router.route(window.location.hash)

// and bind to any changes
    $(window).on('hashchange', () => {
        console.log('hashchange triggered')
        router.route(window.location.hash)
    })
})
