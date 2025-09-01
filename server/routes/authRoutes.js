const express = require('express')
const {
  googleLogin,
  callback,
  emailSignup,
  emailLogin,
  refresh
} = require('../controllers.js/authControllers')


const router = express.Router()

router.get('/google', googleLogin)
router.get('/google/callback', callback)
router.post('/signup', emailSignup)
router.post('/login', emailLogin)
router.get('/refresh', refresh)

module.exports = router





















