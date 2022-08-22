const winston = require('winston')
require('winston-mongodb')

module.exports = (uri) => {
    winston.add(new winston.transports.Console())
    winston.exceptions.handle(new winston.transports.Console())

    winston.add(new winston.transports.MongoDB({
        db: uri,
        level: 'error',
        collection: 'log',
        options: { useUnifiedTopology: true }
    }));

    process.on('unhandledRejection', (ex) => {
        throw ex
    })
}