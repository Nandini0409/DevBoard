const privateDashboard = (req, res) => {
  console.log('Private dashboard accessed')
  const {code, state} = req.query
  if (!req.query.code) { res.redirect('/githubLogin') }
  console.log(code, state)
  res.send('Private dashboard endpoint hit')
}

module.exports = { privateDashboard }