module.exports = (req, res, next) => {
    if (req.session.auth) {
        res.locals.admin = req.session.admin
        next()
        return
    }

    next()
}