const crypto = require('crypto')

const randomString = () => {
  return crypto.randomBytes(20).toString('hex')
}

const googleLogin = async (req, res) => {
  console.log('GitHub login route accessed')
  const state = randomString()
  req.session.oauthState = state
  console.log('Generated state:', state)
  console.log('Session state set to:', req.session.oauthState)
  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID,
    redirect_uri: `${process.env.HOST_URL}/callback`,
    response_type: 'code',
    state: state,
    scope: 'profile email'
  })
res.json({params: params.toString()})
// res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`)
}

module.exports = googleLogin