const cors = require('cors')
const morgan = require('morgan')
const path =  require('path')
const express = require('express')

app = express()

app.use(morgan('combined'))
app.use(cors())

app.use(express.static('webapp/dist'))

app.get('/index_bundle.js', (req, res) => {
    res.sendFile(path.resolve('dist/index_bundle.js'))
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
})

app.listen(80, () => {
    console.log("Prod Webapp server listening on port 80")
})