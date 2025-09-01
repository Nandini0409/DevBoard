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


const verifyToken = (token, type) => {
  try {
    let decodedToken;
    if(type === 'access'){
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    }
    else if(type === 'refresh'){
      decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    }
    return {
      error: false,
      status: 200,
      data: decodedToken
    }
  }
  catch (e) {
    if (e.name === "TokenExpiredError") {
      return {
        error: true,
        status: 401,
        data: 'Token has expired! send request to /refresh endpoint or login again.'
      }
    }
    else {
      return {
        error: true,
        status: 400,
        data: 'Invalid token! Authentication failed.'
      }
    }
  }
}




module.exports = { generateToken, setAuthCookie, verifyToken }