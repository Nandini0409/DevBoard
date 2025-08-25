const Artisan = require('../Database/models/artisans')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const emailLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password fields can not be empty!' })
    }

    const existingArtisan = await Artisan.findOne({ email: email })
    if (!existingArtisan) {
      return res.status(404).json({ message: 'Email not registered! try signup instead.' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingArtisan.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials!' })
    }

    const accessToken = jwt.sign({ id: existingArtisan._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ id: existingArtisan._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

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

    return res.status(200).json({ message: 'Authentication successfull' })
  }
  catch (err) {
    console.error('Error during email login:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = emailLogin