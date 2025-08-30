const uploadToCloud = require('../utilities/cloudUpload')
const { verifyToken } = require('../utilities/tokenVerification')
const Artwork = require('../Database/models/artwork')

const uploadArtwork = async (req, res) => {
  console.log(req.file, req.body)
  const token = req.cookies.access_jwt
  const isVerified = verifyToken(token, 'access')
  if (isVerified.status === 200) {
    let artisanArtworks = await Artwork.findOne({ artisan: isVerified.data.id })
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded, image file missing!' })
    }
    try {
      const uploadResult = await uploadToCloud(req.file, 'artworks_images')
      console.log('Upload Result:', uploadResult)
      const artwork = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        title: req.body.title,
        description: req.body.description
      }
      if (!artisanArtworks) {
        artisanArtworks = new Artwork({ artisan : isVerified.data.id })
      }
      artisanArtworks.images.push(artwork)
      await artisanArtworks.save()
      return res.status(201).json({message: "Artwork uploaded successfully"})
    }
    catch (e) {
      return res.status(500).json({ message: e.message })
    }
  }

}

module.exports = uploadArtwork