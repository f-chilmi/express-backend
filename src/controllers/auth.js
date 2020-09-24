const jwt = require('jsonwebtoken')
require('dotenv').config()

const { getUserByConditions } = require('../models/users')

module.exports = {
  loginController: (req, res) => {
    const { email, password } = req.body
    getUserByConditions(email, password, result => {
      if (result.length) {
        jwt.sign({ id: result[0].id }, process.env.APP_KEY, {
          expiresIn: '1 days'
        }, (_err, token) => {
          res.status(200).send({
            success: true,
            message: 'Login success!',
            token: token
          })
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'Wrong email or password'
        })
      }
    })
  }
}
