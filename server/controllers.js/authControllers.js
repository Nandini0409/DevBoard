const crypto = require('crypto')
const Artisan = require('../Database/models/artisans')
const {generateToken, setAuthCookie} = require('../utilities/tokenUtils')

const randomString = () => {
  return crypto.randomBytes(20).toString('hex')
}

const googleLogin = async (req, res, next) => {
  try {
    const state = randomString()
    if (!req.session) {
      const error = new Error('Session is not available, please try again later!')
      error.status = 500
      throw error
    }
    req.session.oauthState = state
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID,
      redirect_uri: `${process.env.HOST_URL}/callback`,
      response_type: 'code',
      state: state,
      scope: 'profile email'
    })
    return res.status(200).json({ params: params.toString() })
  }
  catch(e){
    next(e)
  }
}


module.exports = {googleLogin}