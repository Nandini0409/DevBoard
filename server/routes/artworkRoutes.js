const express = require('express')
const {
  uploadArtwork, getArtwork
} = require('../controllers.js/artworkControllers')


const router = express.Router()


router.get('/', getArtwork)
router.post('/', uploadArtwork)


module.exports = router