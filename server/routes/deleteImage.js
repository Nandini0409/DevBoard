const { verifyToken } = require('../utilities/tokenVerification')
const Artwork = require('../Database/models/artwork')
const deleteFromCloud = require('../utilities/deleteFromCloud')

const deleteImage = async (req, res) => {
  try {
    const token = req.cookies.access_jwt
    const isVerified = verifyToken(token, 'access')
    const { public_id } = req.params
    if (isVerified.status === 200) {
      let artisanArtworks = await Artwork.findOne({ artisan: isVerified.data.id })
      const newImgArray = artisanArtworks.images.filter(
        (img) => (img.public_id !== public_id)
      )

      if (newImgArray.length === artisanArtworks.images.length) {
        return res.status(404).json({ error: 'Image not found' })
      }

      const result = await deleteFromCloud(public_id)
      artisanArtworks.images = newImgArray
      await artisanArtworks.save()
      return res.status(200).json({ success: true, message: 'Image deleted successfully' })
    }
  }
  catch (e) {
    return res.status(500).json({ error: 'Server error while deleting image' })
  }
}

module.exports = deleteImage