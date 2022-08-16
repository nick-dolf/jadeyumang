const cookieSession= require('cookie-session')
const express = require('express')
const router = express.Router()
router.use(express.urlencoded({extended: false}))
router.use(cookieSession({
  name: 'session',
  keys: [process.env.SECRET_KEY_1, process.env.SECRET_KEY_2],
  maxAge: 120 * 60 * 60 * 1000
}))

const user = {
  name: process.env.USER,
  password: process.env.PASS
}

router.get('/login', (req, res) => {
  res.render('admin/login', { heading: 'Login' })
})

router.post('/login', (req, res) => {
  if (req.body.email === user.name && req.body.password === user.password) {
    req.session.loggedin = true;
    res.redirect('/admin/dashboard')
  } else {
    res.send('incorrect credentials')
  }

})

router.use((req, res, next) => {
  if (req.session.loggedin) {
    next()
  } else {
    req.session.original = req.url
    res.redirect('/admin/login')
  }
})

router.use('/dashboard', require('./routes/dashboard'))
router.use('/pages', require('./routes/pages'))

module.exports = router
