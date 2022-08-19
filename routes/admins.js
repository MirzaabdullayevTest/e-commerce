const { Router } = require('express')
const router = Router()
const Admin = require('../model/admin')
const deleteFile = require('../utils/deleteFile')

router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find()
        res.render('admins', {
            title: 'Admins',
            admins
        })
    } catch (error) {
        if (error) throw new Error(error)
    }
})

router.get('/remove/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id)
        if (admin.image) {
            deleteFile(admin.image)
        }
        res.redirect('/admins')
    } catch (error) {
        if (error) throw new Error(error)
    }
})

module.exports = router