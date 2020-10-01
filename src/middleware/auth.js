const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer ')) {
    let token = authorization.slice(7, authorization.length)
    try {
      token = jwt.verify(token, process.env.APP_KEY)
      if (token) {
        // console.log(req.user = token)
        req.user = token
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
