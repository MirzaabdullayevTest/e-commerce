const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('products', {
        title: 'Products'
    })
})

module.exports = router