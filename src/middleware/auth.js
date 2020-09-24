const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.slice(7, authorization.length)
    try {
      if (jwt.verify(token, process.env.APP_KEY)) {
        next()
      } else {
        res.status(401).send({
          success: false,
          message: 'Unauthorized'
        })
      }
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message
      })
    }
  } else {
    res.status(403).send({
      success: false,
      message: 'Forbidden access'
    })
  }
}
