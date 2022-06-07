const express = require('express')
const { delay } = require('express-delayed-response').init()
const router = express.Router()
const {
  singUp,
  singIn
} = require('../controllers/usersController')

router.post('/singup', singUp)
router.post('/singin', delay({ timeout: 1000 }), singIn)

module.exports = router
