const privateDashboard = async (req, res) => {
  const { code, state } = req.query
  if (!code || !state) { return res.redirect('/githubLogin') }
  if (state !== req.session.oauthState) {
    return res.status(403).send('Invalid state parameter')
  }

 const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    code: code,
    redirect_uri: 'http://localhost:3000/privateDashboard',
  })

  const tokenResponse = await fetch(`https://github.com/login/oauth/access_token?${params.toString()}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    }
  })
  const jsonResponse = await tokenResponse.json()
  const accessToken = jsonResponse.access_token
  console.log(accessToken)
  console.log('Private dashboard accessed')


  //trying to access user data with the token
  const userResponse = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  })
  const userData = await userResponse.json()
  console.log('User Data:', userData)
  return res.send('Private dashboard endpoint hit')
}

module.exports = { privateDashboard }