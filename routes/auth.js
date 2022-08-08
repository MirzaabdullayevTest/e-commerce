const { Router } = require('express')
const router = Router()
const Admin = require('../model/admin')
const bcrypt = require('bcrypt');
const rounds = 10

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'auth'
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        layout: 'auth'
    })
})

router.post('/register', async (req, res) => {
    const hashPassword = await bcrypt.hash(req.body.password, rounds)

    const admin = new Admin({
        fullName: req.body.fullName,
        password: hashPassword,
        image: req.body.image || '',
        email: req.body.email
    })

    await admin.save()
    res.redirect('/auth/login')
})

router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email }) // 

    if (!admin) {
        return res.status(400).send('This email not found')
    }

    const compare = await bcrypt.compare(req.body.password, admin.password)

    if (!compare) {
        return res.status(400).send('Password is incorrect')
    }

    req.session.auth = true
    req.session.admin = admin
    req.session.save((err) => {
        if (err) throw new Error(err)
        return res.redirect('/')
    })
})

module.exports = router