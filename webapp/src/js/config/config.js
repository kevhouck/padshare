if (process.env.NODE_ENV === 'production') {
    module.exports.config = require('./config.prod').config
} else {
    module.exports.config = require('./config.prod').config
}