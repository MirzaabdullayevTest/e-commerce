const { Router } = require('express')
const router = Router()
const Admin = require('../model/admin')
const bcrypt = require('bcrypt');
const rounds = 10

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: 'auth',
        msg: req.flash('error')
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
        email: req.body.email,
        status: req.body.status || null
    })

    await admin.save()
    res.redirect('/auth/login')
})

router.post('/login', async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email }) // 

    if (!admin) {
        req.flash('error', 'Incorrect email')
        return res.redirect('/auth/login')
    }

    const compare = await bcrypt.compare(req.body.password, admin.password)

    if (!compare) {
        req.flash('error', 'Incorrect password')
        return res.redirect('/auth/login')
    }

    req.session.auth = true
    req.session.admin = admin
    req.session.save((err) => {
        if (err) throw new Error(err)
        return res.redirect('/')
    })
})

router.get('/logout', async (req, res) => {
    try {
        await req.session.destroy((err) => {
            if (err) throw new Error(err)
            res.redirect('/auth/login')
        })
    } catch (error) {
        return res.status(400).send(error)
    }
})

module.exports = router