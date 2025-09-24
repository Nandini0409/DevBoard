const express = require('express')
const {
  uploadArtwork, getArtwork
} = require('../controllers.js/artworkControllers')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()


router.get('/', getArtwork)
router.post('/',upload.single('artwork'), uploadArtwork)


module.exports = router