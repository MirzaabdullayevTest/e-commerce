const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

module.exports = (app, uri) => {
    const store = new MongoDBStore({
        uri,
        collection: 'mySessions',
        expires: 1000 * 60 * 5 // sessiya shuncha vaqt o'tgandan keyin o'chadi
    });
    
    app.use(session({
        secret: process.env.SESSION_KEY || 'secretkey',
        resave: false,
        saveUninitialized: false,
        store
    }))
}