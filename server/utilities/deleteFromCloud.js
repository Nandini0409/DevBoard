const cloudConfig = require('./cloudinaryConfig')

const deleteFromCloud = async (public_id) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudConfig.uploader.destroy(public_id, (error, result)=>{
        if(error){
          console.log(error)
        }
        console.log(result)
      })
    })
}

module.exports = deleteFromCloud