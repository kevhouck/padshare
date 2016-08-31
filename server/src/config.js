export default {
    web: {
        hostname: process.env.WEB_HOSTNAME || 'localhost',
        port: process.env.WEB_PORT || '3000'
    },
    redis: {
        hostname: process.env.REDIS_HOSTNAME || 'localhost',
        port: process.env.REDIS_PORT || '6379'
    },
    logging: {
        verbosity: process.env.LOGGING_VERBOSITY || 'all' // all, error, none
    }
}