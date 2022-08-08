const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { create } = require('express-handlebars')
const uri = 'mongodb://localhost:27017/e-commerce'
const path = require('path')
const session = require('express-session')

// require routes
const homeRouter = require('./routes/home')
const categoriesRouter = require('./routes/categories')
const adminsRouter = require('./routes/admins')
const productsRouter = require('./routes/products')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

// require middlewares
const adminMiddleware = require('./middleware/admin')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

async function db() {
    try {
        await mongoose.connect(uri, (err) => {
            if (err) throw new Error(err)
            console.log('MongoDB connected', uri);
        })
    } catch (error) {
        console.error(error);
    }
}

db()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use(session({   
    secret: process.env.SESSION_KEY || 'secretkey',
    resave: false,
    saveUninitialized: false,
}))

// admin use middleware 
app.use(adminMiddleware)

//routing
app.use('/', homeRouter)
app.use('/categories', categoriesRouter)
app.use('/admins', adminsRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

const port = normalizePort(process.env.PORT || 3000)
app.set('port', port)

try {
    app.listen(port, () => {
        console.log('Server working on port', port);
    })
} catch (error) {
    console.error(error);
}

function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}