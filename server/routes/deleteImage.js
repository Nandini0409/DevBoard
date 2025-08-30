const { verifyToken } = require('../utilities/tokenVerification')
const Artwork = require('../Database/models/artwork')

const deleteImage = (req, res)=>{
  const token = req.cookies.access_jwt
  const isVerified = verifyToken(token, 'access')
  
}