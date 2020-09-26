const jwt = require('jsonwebtoken')
require('dotenv').config()

const { getUserByConditions } = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = {
  loginController: (req, res) => {
    const { email, password } = req.body
    getUserByConditions(email, result => {
      // console.log(result[0].password)
      // console.log(password)
      if (result.length) {
        // console.log(bcrypt.compareSync(password, result[0].password))
        if (bcrypt.compareSync(req.body.password, result[0].password)) {
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
            message: 'Wrong password. Are you sure this account belongs to you?'
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Wrong email or password'
        })
      }
    })
  }
}
