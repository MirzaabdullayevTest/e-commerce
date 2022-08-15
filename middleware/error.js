module.exports = (req, res, next) => {
    res.render('error', {
        title: 404,
        layout: 'auth'
    })
}