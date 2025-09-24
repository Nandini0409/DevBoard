const { uploadToCloud } = require('../utilities/cloudinaryUtils')
const { verifyToken } = require('../utilities/tokenUtils')
const Artwork = require('../Database/models/artwork')

const uploadArtwork = async (req, res, next) => {
  try {
    const token = req.cookies.access_jwt
    if (!token) {
      const error = new Error('token is missing')
      error.status = 401
      throw error
    }
    const isVerified = verifyToken(token, 'access')

    if (!req.body.title || !req.body.description) {
      const error = new Error('Title and description are required!')
      error.status = 400
      throw error
    }

    if (isVerified.status !== 200) {
      const error = new Error(isVerified.data)
      error.status = isVerified.status
      throw error
    }

    console.log(isVerified.data.id)
    let artisanArtworks = await Artwork.findOne({ artisan: isVerified.data.id })
    if (!artisanArtworks) {
      artisanArtworks = new Artwork({ artisan: isVerified.data.id, images: [] })
    }

    if (!req.file) {
      const error = new Error('image file missing!')
      error.status = 400
      throw error
    }


    console.log(artisanArtworks)
      if (artisanArtworks.images.length >= 10) {
        const error = new Error('Maximum 10 artworks allowed!')
        error.status = 400
        throw error
      }

    let uploadResult
    try {
      uploadResult = await uploadToCloud(req.file, 'artworks_images')
    }
    catch (e) {
      const error = new Error('Error uploading image!')
      error.status = 502
      throw error
    }
    const artwork = {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      title: req.body.title,
      description: req.body.description
    }
    if (!artisanArtworks) {
      artisanArtworks = new Artwork({ artisan: isVerified.data.id })
    }
    artisanArtworks.images.push(artwork)

    let updatedArtworks
    try {
      updatedArtworks = await artisanArtworks.save()
    }
    catch (e) {
      const error = new Error('Database operation failed!')
      error.status = 500
      throw error
    }

    return res.status(201).json({ message: "Artwork uploaded successfully", data: updatedArtworks })
  }
  catch (e) {
    next(e)
  }
}

const getArtwork = async (req, res, next) => {
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

    let artworks = await Artwork.findOne({ artisan: isVerified.data.id })
    if (!artworks) {
      return res.status(200).json({ message: 'No artworks uploaded yet', artworks: [] })
    }
    return res.status(200).json({ message: 'Artworks fetched successfully', artworks })

  }
  catch (e) {
    next(e)
  }
}

module.exports = { uploadArtwork, getArtwork }