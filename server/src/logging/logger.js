export default class Logger {
    constructor(verbosity) {
        switch (verbosity) {
            case 'none':
                this.logAction = (type, message) => {}
                break
            case 'error':
                this.logAction = (type, message) => {
                    if (type === 'ERROR') {
                        console.log('[' + type + '] ' + message)
                    }
                }
                break
            case 'all':
                this.logAction = (type, message) => {
                    console.log('[' + type + '] ' + message)
                }
                break
            default:
                throw new Error('Invalid logging verbosity')
        }
    }

    log(type, message) {
        this.logAction(type, message)
    }
}