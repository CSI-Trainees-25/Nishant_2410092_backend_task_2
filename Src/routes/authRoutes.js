import express from 'express'
const router = express.Router()
const authController = require('../controllers/authcontroller.js')

router.post('/auth/register', authController.register)

module.exports = router