const express = require('express')
const { deleteImage } = require('../controllers.js/authControllers')


const router = express.Router()

router.delete('/delete', deleteImage)

module.exports = router