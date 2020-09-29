const {
  showAllUsersModel,
  showDetailUserModel,
  createNewUserModel,
  changeUserModel,
  deleteUserModel,
  getUserByEmail,
  addAddressModel,
  showAddressModel,
  editAddressModel
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
    const { name, email, password, phone, gender, birth } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const { filename } = req.file
    const urlPicture = `${process.env.APP_URL}uploads/${filename}`
    const data = Object.entries(req.body).map(item => {
      return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}="${item[1]}"`
    })

    if (name || email || password || phone || gender || birth) {
      getUserByEmail(email, result => {
        if (result.length) {
          if (!result[0].id == id) {
            res.status(401).send({
              success: false,
              message: 'email already exist'
            })
          } else {
            changeUserModel(id, data, hashedPassword, urlPicture, birth, result => {
              console.log(typeof birth)
              console.log(result)
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
          changeUserModel(id, data, hashedPassword, urlPicture, birth, result => {
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
  addAddress: (req, res) => {
    const { id } = req.params
    const { nameAddress, recipientsName, recipientsPhone, address, postalCode, city } = req.body
    addAddressModel(id, nameAddress, recipientsName, recipientsPhone, address, postalCode, city, result => {
      console.log(req.body)
      res.status(200).send({
        success: true,
        message: 'success add address',
        data: req.body
      })
    })
  },
  showAddress: (req, res) => {
    const { id } = req.params
    showAddressModel(id, result => {
      res.status(200).send({
        success: true,
        data: result
      })
    })
  },
  editAddress: (req, res) => {
    const { id } = req.params
    // const { nameAddress, recipientsName, recipientsPhone, address, postalCode, city } = req.body
    const data = Object.entries(req.body).map(item => {
      return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}="${item[1]}"`
    })
    editAddressModel(id, data, result => {
      res.status(200).send({
        success: true,
        message: 'success edit address',
        data: req.body
      })
    })
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
