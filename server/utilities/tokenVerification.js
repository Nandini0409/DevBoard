const jwt = require('jsonwebtoken')

const verifyToken = (token, type) => {
  if (!token) {
    return {
      error: true,
      status: 401,
      data: 'Token is missing!'
    }
  }
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
        data: 'Token is invalid! Authentication failed.'
      }
    }
  }
}

module.exports = { verifyToken }