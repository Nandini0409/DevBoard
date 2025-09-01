const crypto = require('crypto')
const bcrypt = require('bcrypt')
const Artisan = require('../Database/models/artisans')
const { generateToken, setAuthCookie, verifyToken } = require('../utilities/tokenUtils')
const { passwordValidator } = require('../utilities/inputValidator')

const googleLogin = async (req, res, next) => {
  try {
    const state = crypto.randomBytes(20).toString('hex')
    if (!req.session) {
      const error = new Error('Session is not available, please try again later!')
      error.status = 500
      throw error
    }
    req.session.oauthState = state
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID,
      redirect_uri: `${process.env.HOST_URL}/auth/google/callback`,
      response_type: 'code',
      state: state,
      scope: 'profile email'
    })
    return res.status(200).json({ params: params.toString() })
  }
  catch (e) {
    next(e)
  }
}

const callback = async (req, res, next) => {
  try {

    const { code, state } = req.query
    if (!code || !state) {
      const error = new Error('Missing code or state in query parameters')
      error.status = 400
      throw error
    }

    if (state !== req.session.oauthState) {
      const error = new Error('Invalid state parameter!')
      error.status = 403
      throw error
    }

    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code: code,
      redirect_uri: `${process.env.HOST_URL}/auth/google/callback`,
      grant_type: 'authorization_code',
    })
    const tokenResponse = await fetch(`https://oauth2.googleapis.com/token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    })
    if (!tokenResponse.ok) {
      const error = new Error('Google OAuth token exchange failed')
      error.status = 502
      throw error
    }
    const tokenData = await tokenResponse.json()

    const userProfileResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      }
    })
    if (!userProfileResponse.ok) {
      const error = new Error('Failed to fetch user profile from Google')
      error.status = 502
      throw error
    }
    const userData = await userProfileResponse.json()
    const { email, name, given_name } = userData

    let existingArtisan = await Artisan.findOne({ email: email })
    if (!existingArtisan) {
      const newArtisan = new Artisan({ email, name, userName: given_name, userAuthType: 'google' })
      try {
        await newArtisan.save()
      }
      catch (e) {
        const error = new Error(`Database operation failed: ${e.message}`)
        error.status = 500
        throw error
      }
      existingArtisan = newArtisan
    }

    const accessToken = generateToken(existingArtisan._id, 'access')
    setAuthCookie(accessToken, 'access', res)
    const refreshToken = generateToken(existingArtisan._id, 'refresh')
    setAuthCookie(refreshToken, 'refresh', res)

    res.redirect(`${process.env.CLIENT_URL}/privateDashboard`)
  }
  catch (e) {
    next(e)
  }
}

const emailSignup = async (req, res, next) => {
  const { email, name, password, userName } = req.body
  try {
    if (!name || !email || !password || !userName) {
      const error = new Error('Missing one or more required feilds!')
      error.status = 400
      throw error
    }

    const alreadyExists = await Artisan.findOne({ email: email })
    if (alreadyExists) {
      const error = new Error('User with this email already exists, try logging in instead!')
      error.status = 409
      throw error
    }

    if (!passwordValidator(password)) {
      const error = new Error('Invalid password format! should be minimum 8 character long and have atleast 1 special character.')
      error.status = 400
      throw error
    }

    const newArtisan = new Artisan({ email, name, password, userName, userAuthType: 'email' })
    try {
      await newArtisan.save()
    }
    catch (e) {
      const error = new Error('Database insertion failed!')
      error.status = 500
      throw error
    }

    const accessToken = generateToken(newArtisan._id, 'access')
    setAuthCookie(accessToken, 'access', res)
    const refreshToken = generateToken(newArtisan._id, 'refresh')
    setAuthCookie(refreshToken, 'refresh', res)

    return res.status(201).json({ message: 'User created successfully!' })
  }
  catch (e) {
    next(e)
  }
}

const emailLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      const error = new Error('Email and password are required.')
      error.status = 400
      throw error
    }

    const existingArtisan = await Artisan.findOne({ email: email })
    if (!existingArtisan) {
      const error = new Error('Invalid credentials.')
      error.status = 401
      throw error
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingArtisan.password)
    if (!isPasswordCorrect) {
      const error = new Error('Invalid credentials.')
      error.status = 401
      throw error
    }

    const accessToken = generateToken(existingArtisan._id, 'access')
    setAuthCookie(accessToken, 'access', res)
    const refreshToken = generateToken(existingArtisan._id, 'refresh')
    setAuthCookie(refreshToken, 'refresh', res)

    return res.status(200).json({ message: 'Authentication successfull' })
  }
  catch (e) {
    next(e)
  }
}

const refresh = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refresh_jwt
    if(!refreshToken){
      const error = new Error('token is missing')
      error.status = 401
      throw error
    }
    const isVerified = verifyToken(refreshToken, 'refresh')
    if (isVerified.status === 200) {
      const accessToken = generateToken(isVerified.data.id, 'access')
      setAuthCookie(accessToken, 'access', res)
      return res.json({ message: 'Access token refreshed successfully' })
    }
    else {
      const error = new Error(isVerified.data || 'Authentication failed')
      error.status = isVerified.status
      throw error
    }
  }
  catch (e) {
    next(e)
  }
}

module.exports = { googleLogin, callback, emailSignup, emailLogin, refresh }