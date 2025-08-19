const { redisConnect } = require('../utilities/redisConnect')

const privateDashboard = async (req, res) => {
  const {code, state} = req.query
  if (!code || !state) { return res.redirect('/githubLogin') }
  // const redisClient = redisConnect()
  // const trueState = await redisClient.get('state')
  // if (trueState !== state) {
  //   console.log('State mismatch, redirecting to GitHub login')
  //   return res.redirect('/githubLogin')
  // }
  console.log(code, state)
  console.log('Private dashboard accessed')
  return res.send('Private dashboard endpoint hit')
}
 
module.exports = { privateDashboard }