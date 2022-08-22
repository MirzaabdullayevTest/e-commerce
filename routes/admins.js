const { Router } = require('express')
const router = Router()
const Admin = require('../model/admin')
const deleteFile = require('../utils/deleteFile')

router.get('/', async (req, res) => {
    const admins = await Admin.find()
    res.render('admins', {
        title: 'Admins',
        admins
    })
})

router.get('/remove/:id', async (req, res) => {
    const admin = await Admin.findByIdAndDelete(req.params.id)
    if (admin.image) {
        deleteFile(admin.image)
    }
    res.redirect('/admins')
})

module.exports = router