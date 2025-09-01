const express = require('express')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const {
  getProfile,
  updateProfile,
  updateSocials
} = require('../controllers.js/profileControllers')


const router = express.Router()


router.get('/profile', getProfile)
router.put('/profile', upload.single('profileImage'), updateProfile)
router.put('/socials', updateSocials)


module.exports = router