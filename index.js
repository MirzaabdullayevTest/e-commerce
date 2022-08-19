const express = require('express')
const app = express()

require('dotenv').config()

const uri = process.env.MONGO_URI
require('./helper/session')(app, uri)
require('./helper/db')(uri)
require('./utils/flash')(app)

// routes
require('./start/routes')(app)

app.set('port', require('./utils/normalizePort')(process.env.PORT || 3000))

try {
    app.listen(app.get('port'), () => {
        console.log('Server working on port', app.get('port'));
    })
} catch (error) {
    console.error(error);
}