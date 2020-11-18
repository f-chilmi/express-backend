const jwt = require('jsonwebtoken')
require('dotenv').config()

const {
  getUserByConditions,
  getUserByEmail,
  createNewUserModel
} = require('../models/users')

const { checkEmailSellerModel, createSellerModel } = require('../models/sellers')

const bcrypt = require('bcryptjs')

module.exports = {
  loginController: (req, res) => {
    const { email, password } = req.body
    getUserByConditions(email, result => {
      // console.log(password)
      if (result.length) {
        // console.log(bcrypt.compareSync(password, result[0].password))
        const user = result[0]
        console.log(user.id)

        if (bcrypt.compareSync(password, result[0].password)) {
          // jwt.sign({ id: user.id }, process.env.APP_KEY, {
          //   expiresIn: '1 days'
          // }
          // , (_err, token) => {
          const token = jwt.sign({ id: user.id }, process.env.APP_KEY, { expiresIn: '1 days' })
          // console.log(token)
          res.status(200).send({
            success: true,
            message: 'Login success!',
            token: token
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
  },
  signupController: (req, res) => {
    const { name, email, password } = req.body
    if (name && email && password) {
      getUserByEmail(email, result => {
        if (result.length) {
          res.status(401).send({
            success: false,
            message: 'email already exist'
          })
        } else {
          const salt = bcrypt.genSaltSync(10)
          const hashedPassword = bcrypt.hashSync(password, salt)
          createNewUserModel([name, email, hashedPassword], _result => {
            res.send({
              success: true,
              message: 'user created',
              data: {
                ...req.body,
                password: hashedPassword
              }
            })
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'all field must be filled'
      })
    }
  },
  loginSellerController: (req, res) => {
    const { email, password } = req.body
    checkEmailSellerModel(email, result => {
      // console.log(result[0].password)
      // console.log(password)
      if (result.length) {
        // console.log(bcrypt.compareSync(password, result[0].password))
        if (bcrypt.compareSync(password, result[0].password)) {
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
  },
  signupSellerController: (req, res) => {
    const { name, email, phone, storeName, password } = req.body
    if (name && email && phone && storeName && password) {
      checkEmailSellerModel(email, result => {
        if (result.length) {
          res.status(401).send({
            success: false,
            message: 'email already exist'
          })
        } else {
          const salt = bcrypt.genSaltSync(10)
          const hashedPassword = bcrypt.hashSync(password, salt)
          createSellerModel([name, email, phone, storeName, hashedPassword], result => {
            res.send({
              success: true,
              message: 'user created',
              data: {
                ...req.body,
                password: hashedPassword
              }
            })
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'all field must be filled'
      })
    }
  },
}
