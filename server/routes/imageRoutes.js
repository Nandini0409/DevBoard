const { verifyToken } = require('../utilities/tokenUtils')
const Artwork = require('../Database/models/artwork')
const {deleteFromCloud} = require('../utilities/cloudinaryUtils')

const deleteImage = async (req, res, next) => {
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

    const { public_id } = req.params
    let artisanArtworks = await Artwork.findOne({ artisan: isVerified.data.id })
    const newImgArray = artisanArtworks.images.filter(
      (img) => (img.public_id !== public_id)
    )

    if (newImgArray.length === artisanArtworks.images.length) {
      return res.status(404).json({ error: 'Image not found' })
    }

    try{
      const result = await deleteFromCloud(public_id)
    }
    catch(e){
      const error = new Error('error deleting image!')
      error.status = 502
      throw error
    }
    artisanArtworks.images = newImgArray

    try{
      await artisanArtworks.save()
    }
    catch(e){
      const error = new Error('database operation failed!')
      error.status = 500
      throw error
    }
    return res.status(200).json({ success: true, message: 'Image deleted successfully' })
  }
  catch (e) {
    next(e)
  }
}

module.exports = deleteImage