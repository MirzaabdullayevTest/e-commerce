const { Router } = require('express')
const router = Router()
const Category = require('../model/category')

router.get('/', async (req, res) => {
    const categories = await Category.find() // []
    res.render('categories', {
        title: 'Categories',
        categories
    })
})

router.get('/add', (req, res) => {
    res.render('categoryAdd', {
        title: 'Create new category'
    })
})

router.post('/add', async (req, res) => {
    const { categoryName, categoryImg } = req.body
    const category = new Category({
        categoryName,
        categoryImg
    })

    await category.save()
    res.redirect('/categories')
})

module.exports = router