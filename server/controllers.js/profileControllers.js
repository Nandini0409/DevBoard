const Artisan = require('../Database/models/artisans')
const { verifyToken } = require('../utilities/tokenUtils')
const uploadToCloud = require('../utilities/cloudinaryUtils')


const getProfile = async (req, res, next) => {
  try {
    const token = req.cookies.access_jwt
    if (!token) {
      const error = new Error('token is missing')
      error.status = 401
      throw error
    }
    const isVerified = verifyToken(token, 'access')
    if (isVerified.status === 200) {
      const artisan = await Artisan.findById(isVerified.data.id)
      if (!artisan) {
        const error = new Error('user not found')
        error.status = 404
        throw error
      }
      return res.status(200).json({ message: 'Authentication successfull', user: artisan })
    }
    else {
      const error = new Error(isVerified.data)
      error.status = isVerified.status
      throw error
    }
  }
  catch (e) {
    next(e)
  }
}

const updateProfile = async (req, res, next) => {
  console.log("Received profile update request")
  try {
    const token = req.cookies.access_jwt
    if (!token) {
      const error = new Error('token is missing')
      error.status = 401
      throw error
    }
    const isVerified = verifyToken(token, 'access')

    if (isVerified.status === 200) {
      const artisan = await Artisan.findById(isVerified.data.id)
      if (!artisan) {
        const error = new Error('User not found!')
        error.status = 404
        throw error
      }
      let uploadResult = null
      if (req.file) {
        try {
          console.log(req.file, "hiiiiiii")
          uploadResult = await uploadToCloud(req.file, 'profile_images')
        }
        catch (e) {
          const error = new Error('Error uploading image!')
          error.status = 502
          throw error
        }
      }

      artisan.email = req.body.email || artisan.email
      artisan.name = req.body.name || artisan.name
      artisan.userName = req.body.userName || artisan.userName
      artisan.bio = req.body.bio || artisan.bio
      if (uploadResult) {
        artisan.profileImage.url = uploadResult.secure_url || artisan.profileImage.url
        artisan.profileImage.public_id = uploadResult.public_id || artisan.profileImage.public_id
      }

      let updatedArtisan
      try {
        updatedArtisan = await artisan.save()
      }
      catch (e) {
        const error = new Error('Database operation failed!')
        error.status = 500
        throw error
      }
      return res.status(200).json({ message: 'profile updation successful', user: updatedArtisan })
    }
    else {
      const error = new Error(isVerified.data)
      error.status = isVerified.status
      throw error
    }
  }
  catch (e) {
    next(e)
  }
}

const updateSocials = async (req, res, next) => {
  try {

    const token = req.cookies.access_jwt
    if (!token) {
      const error = new Error('token is missing')
      error.status = 401
      throw error
    }
    const isVerified = verifyToken(token, 'access')

    if (isVerified.status !== 200) {
      const error = new Error(isVerified.data)
      error.status = isVerified.status
      throw error
    }

    const artisan = await Artisan.findById(isVerified.data.id)
    if (!artisan) {
      const error = new Error('User not found!')
      error.status = 404
      throw error
    }

    artisan.socialLinks.instagram = req.body.instagram?.trim() || artisan.socialLinks.instagram
    artisan.socialLinks.linkedin = req.body.linkedin || artisan.socialLinks.linkedin
    artisan.socialLinks.behance = req.body.behance || artisan.socialLinks.behance
    artisan.socialLinks.dribbble = req.body.dribbble || artisan.socialLinks.dribbble
    artisan.socialLinks.website = req.body.website || artisan.socialLinks.website
    artisan.socialLinks.workemail = req.body.workemail || artisan.socialLinks.workemail

    let updatedArtisan
    try {
      updatedArtisan = await artisan.save()
    }
    catch (e) {
      const error = new Error('Database operation failed!')
      error.status = 500
      throw error
    }

    return res.status(200).json({ message: 'Social links updation successful', user: updatedArtisan })
  }
  catch (e) {
    next(e)
  }
}


module.exports = { getProfile, updateProfile, updateSocials }