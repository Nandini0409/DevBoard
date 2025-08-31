const jwt = require('jsonwebtoken')

const generateToken = (artisanId, tokenType) => {
  let token
  if (tokenType === 'access') {
    token = jwt.sign(
      { id: artisanId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )
  }
  else {
    token = jwt.sign(
      { id: artisanId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    )
  }
  return token
}


const setAuthCookie = (token, type, res) => {
  if (type === 'refresh') {
    res.cookie('refresh_jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
  }
  else{
    res.cookie('access_jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    })
  }
}


module.exports = { generateToken, setAuthCookie }