const verifyToken = require('../utilities/tokenVerification')

const refresh = (req, res) => {
  const refreshToken = req.cookies.refresh_jwt
  console.log(refreshToken)
  const isVerified = verifyToken(refreshToken, 'refresh')
  if (isVerified.status === 200) {
    const newAccessToken = jwt.sign({ id: isVerified.data.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    res.cookie('access_jwt', newAccessToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    })
    return res.json({ message: 'Access token refreshed successfully' })
  }
  else if (isVerified.status === 401) {
    return res.status(401).json({ message: isVerified.data })
  }
  else {
    return res.status(400).json({ message: isVerified.data })
  }
}

module.exports = refresh 