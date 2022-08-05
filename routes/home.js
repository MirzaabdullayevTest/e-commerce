const { Router } = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.render('home', {
        title: 'Admin'
    })
})

module.exports = router