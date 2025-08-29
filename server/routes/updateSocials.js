const { verifyToken } = require('../utilities/tokenVerification')
const Artisan = require('../Database/models/artisans')

const updateSocails = async (req, res) => {
  const token = req.cookies.access_jwt
  const isVerified = verifyToken(token, 'access')
  if (isVerified.status !== 200) {
    return res.status(isVerified.status).json({ message: isVerified.data })
  }
  if (isVerified.status === 200) {
    const artisan = await Artisan.findById(isVerified.data.id)
    if (!artisan) {
      return res.status(404).json({ message: 'User not found!', data: artisan })
    }

    artisan.socialLinks.instagram = req.body.instagram || artisan.socialLinks.instagram
    artisan.socialLinks.linkedin = req.body.linkedin || artisan.socialLinks.linkedin
    artisan.socialLinks.behance = req.body.behance || artisan.socialLinks.behance
    artisan.socialLinks.dribbble = req.body.dribbble || artisan.socialLinks.dribbble
    artisan.socialLinks.website = req.body.website || artisan.socialLinks.website
    artisan.socialLinks.workemail = req.body.workemail || artisan.socialLinks.workemail

    await artisan.save()
    return res.status(200).json({ message: 'Social links updation successful', user: artisan })
  }
  else if (isVerified.status === 401) {
    return res.status(401).json({ message: isVerified.data })
  }
  else {
    return res.status(400).json({ message: isVerified.data })
  }
}

module.exports = updateSocails