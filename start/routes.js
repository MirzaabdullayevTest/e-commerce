require('express-async-errors')
const express = require('express')
const { create } = require('express-handlebars')
const path = require('path')

// require routes
const homeRouter = require('../routes/home')
const categoriesRouter = require('../routes/categories')
const adminsRouter = require('../routes/admins')
const productsRouter = require('../routes/products')
const usersRouter = require('../routes/users')
const authRouter = require('../routes/auth')

// require middlewares
const adminMiddleware = require('../middleware/admin')
const isAuth = require('../middleware/isAuth')
const error = require('../middleware/error')
const handleError = require('../middleware/handleError')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

module.exports = (app) => {
    app.engine('hbs', hbs.engine)
    app.set('view engine', 'hbs')
    app.use(express.json())
    app.use(express.static(path.join(__dirname, '..', 'public')))
    app.use(express.urlencoded({ extended: true }))

    app.use('/auth', authRouter)

    // admin use middleware 
    app.use(adminMiddleware)
    app.use(isAuth)

    //routing
    app.use('/', homeRouter)
    app.use('/categories', categoriesRouter)
    app.use('/admins', adminsRouter)
    app.use('/products', productsRouter)
    app.use('/users', usersRouter)

    // handle middleware
    app.use(handleError)

    // error 404
    app.use(error)
}