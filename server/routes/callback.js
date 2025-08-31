const Artisan = require('../Database/models/artisans')
const {generateToken, setAuthCookie} = require('../utilities/tokenUtils')


const callback = async (req, res) => {
  const { code, state } = req.query
  console.log(req.session)
  if (!code || !state) { return res.redirect('/googleLogin') }
  if (state !== req.session.oauthState) {
    console.log('State mismatch: expected', req.session.oauthState, 'but got', state)
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

  const accessToken = generateToken(existingArtisan._id, 'access')
  setAuthCookie(accessToken, 'access', res)
  const refreshToken = generateToken(existingArtisan._id, 'refresh')
  setAuthCookie(refreshToken, 'refresh', res)

  res.redirect(`${process.env.CLIENT_URI}/privateDashboard`)
}

module.exports = callback 