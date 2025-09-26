const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const verifyToken = (req, res, next) => {
  // token gets sent via request Headers in postman
  const token = req.header('Authorization')

  if (token) {
    // permit access
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY)
      next()
    } catch (error) {
        // Invalid Token
      res.status(401).json({
        message: 'failure',
        payload: error
      })
    }
  } else {
    // No token
    res.status(500).json({
      message: 'failure',
      payload: "No token found"
    })
  }
}

module.exports = verifyToken
