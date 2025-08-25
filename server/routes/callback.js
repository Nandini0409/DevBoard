const Artisan = require('../Database/models/artisans')
const jwt = require('jsonwebtoken')

const callback = async (req, res) => {
  const { code, state } = req.query
  if (!code || !state) { return res.redirect('/googleLogin') }
  if (state !== req.session.oauthState) {
    return res.status(403).send('Invalid state parameter')
  }

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    code: code,
    redirect_uri: `${process.env.HOST_URL}/callback`,
    grant_type: 'authorization_code',
  })

  const tokenResponse = await fetch(`https://oauth2.googleapis.com/token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  })
  const jsonResponse = await tokenResponse.json()

  const userResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jsonResponse.access_token}`,
    }
  })
  const userData = await userResponse.json()
  const { email, name, given_name } = userData

  let existingArtisan = await Artisan.findOne({ email: email })
  if (!existingArtisan) {
    console.log(email, name, given_name)
    const newArtisan = new Artisan({ email, name, userName: given_name, userAuthType: 'google' })
    await newArtisan.save()
    existingArtisan = newArtisan
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
  console.log(accessToken,   refreshToken)

  res.redirect('/privateDashboard')
}

module.exports = callback 