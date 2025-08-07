const crypto = require('crypto')

const randomString = () => {
  return crypto.randomBytes(20).toString('hex')
}

const githubLogin = async (req, res) => {
  console.log('GitHub login route accessed')
  const state = randomString()

  const params = new URLSearchParams({
    client_id: process.env.OAUTH_CLIENT_ID,
    redirect_uri: 'http://localhost:3000/privateDashboard',
    state: state,
    scope: 'read:user user:email',
    prompt: 'consent'
  })

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`
  )


}

module.exports = { githubLogin }