const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('users', {
        title: 'Users'
    })
})

module.exports = router