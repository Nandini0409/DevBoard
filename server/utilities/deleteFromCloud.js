const cloudConfig = require('./cloudinaryConfig')

const deleteFromCloud = async (file, folder) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudConfig.uploader.upload_stream(
      { resource_type: 'image', folder: folder },
      (error, result) => {
        if (error) return reject(error)
        resolve(result)
      }
    )
    streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
}

module.exports = deleteFromCloud