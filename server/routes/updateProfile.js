const Artisan = require('../Database/models/artisans')
const {verifyToken} = require('../utilities/tokenVerification')

const updateProfile = async (req, res)=>{
  const token = req.cookies.access_jwt
  const isVerified = verifyToken(token, 'access')
  console.log(req.body, req.cookies.access_jwt)

  if(isVerified.status === 200){
    const artisan = await Artisan.findById(isVerified.data.id)
    if(!artisan){
      return res.status(404).json({ message: 'User not found!' , data : artisan})
    }
    artisan.email = req.body.email || artisan.email,
    artisan.name = req.body.name || artisan.name,
    artisan.userName = req.body.userName || artisan.userName,
    artisan.bio = req.body.bio || artisan.bio

    await artisan.save()
    return res.status(200).json({ message: 'profile updation successful', user: artisan })
  }
  else if(isVerified.status === 401){
    return res.status(401).json({ message: isVerified.data })
  }
  else{
    return res.status(400).json({ message: isVerified.data })
  }
}

module.exports = updateProfile