const morgan = require('morgan')
const loggerMiddleware = morgan('combined')

module.exports = function (app) {
    app.use(loggerMiddleware)
}