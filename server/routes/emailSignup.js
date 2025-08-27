const jwt = require('jsonwebtoken')
const Artisan = require('../Database/models/artisans')
const { passwordValidator } = require('../utilities/inputValidator')
const verifyEmail = require('../utilities/emailVerification')

const emailSignup = async (req, res) => {
  const { email, name, password, userName } = req.body
  try {
    if (!name || !email || !password || !userName) {
      console.log('Received incomplete signup data:', req.body)
      return res.status(400).json({ message: 'User Info fields can not be empty!' })
    }
    
    const alreadyExists = await Artisan.findOne({ email: email })
    if (!passwordValidator(password)) {
      console.log('Invalid password attempt during signup for email:', email)
      return res.status(400).json({ message: 'Invalid password! should be minimum 8 character long and have atleast 1 special character.' })
    }

    if (alreadyExists) {
      return res.status(409).json({ message: 'User with this email already exists, try logging in instead!' })
    }


    // if(await verifyEmail(email) !== true){
    //   return res.status(422).json({ message: 'Email does not exist!' })
    // }

    const newArtisan = new Artisan({ email, name, password, userName, userAuthType: 'email' })
    await newArtisan.save()

    const accessToken = jwt.sign({ id: newArtisan._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ id: newArtisan._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    res.cookie('refresh_jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.cookie('access_jwt', accessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    })
    console.log('New user signed up:', newArtisan)
    return res.status(201).json({ message: 'User created successfully!' })
  }
  catch (err) {
    console.error('Error during email signup:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = emailSignup