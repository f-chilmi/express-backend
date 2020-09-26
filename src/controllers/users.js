const {
  showAllUsersModel,
  showDetailUserModel,
  createNewUserModel,
  changeUserModel,
  deleteUserModel,
  getUserByEmail
} = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = {
  showAllUsers: (_req, res) => {
    showAllUsersModel(result => {
      res.send({
        success: true,
        message: 'List users',
        data: result
      })
    })
  },
  getDetailUser: (req, res) => {
    const { id } = req.params
    showDetailUserModel(id, result => {
      res.send({
        success: true,
        message: 'detail id user',
        data: result
      })
    })
  },
  createNewUser: (req, res) => {
    const { name, email, password } = req.body
    const { filename } = req.file
    const urlPicture = `${process.env.APP_URL}uploads/${filename}`
    console.log(urlPicture)
    getUserByEmail(email, result => {
      if (result.length) {
        res.status(401).send({
          success: false,
          message: 'email already exist'
        })
      } else {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        createNewUserModel([name, email, hashedPassword, urlPicture], _result => {
          console.log(result)
          res.send({
            success: true,
            message: 'user created',
            data: {
              ...req.body,
              password: hashedPassword,
              picture: urlPicture
            }
          })
        })
      }
    })
  },
  changeUser: (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
    const { filename } = req.file
    const urlPicture = `${process.env.APP_URL}uploads/${filename}`
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    if (name && email && password) {
      getUserByEmail(email, result => {
        if (result.length) {
          if (!result[0].id == id) {
            res.status(401).send({
              success: false,
              message: 'email already exist'
            })
          } else {
            changeUserModel(id, [name, email, hashedPassword, urlPicture], _result => {
              res.send({
                success: true,
                message: `user ${id} has been updated`,
                data: {
                  ...req.body,
                  password: hashedPassword,
                  picture: urlPicture
                }
              })
            })
          }
        } else {
          changeUserModel(id, [name, email, hashedPassword, urlPicture], _result => {
            res.send({
              success: true,
              message: `user ${id} has been updated`,
              data: {
                ...req.body,
                password: hashedPassword,
                picture: urlPicture
              }
            })
          })
        }
      })
    }
  },
  deteleUser: (req, res) => {
    const { id } = req.params
    deleteUserModel(id, _result => {
      res.send({
        success: true,
        message: `user ${id} deleted`
      })
    })
  }
}
