const Artisan = require('../Database/models/artisans')
const {verifyToken} = require('../utilities/tokenVerification')

const getProfile = async (req, res)=>{
  const token = req.cookies.access_jwt
  const isVerified = verifyToken(token, 'access')

  if(isVerified.status === 200){
    const artisan = await Artisan.findById(isVerified.data.id)
    if(!artisan){
      return res.status(404).json({ message: 'User not found!' , data : artisan})
    }
    return res.status(200).json({ message: 'Authentication successfull', user: artisan })
  }
  else if(isVerified.status === 401){
    return res.status(401).json({ message: isVerified.data })
  }
  else{
    return res.status(400).json({ message: isVerified.data })
  }
}

module.exports = getProfile