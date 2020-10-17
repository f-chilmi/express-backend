const {
  showAllUsersModel,
  showDetailUserModel,
  createNewUserModel,
  changeUserModel,
  deleteUserModel,
  getUserByEmail,
  addAddressModel,
  showAddressModel,
  editAddressModel,
  changeUserModel2
} = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = {
  showAllUsers: (req, res) => {
    // console.log(req.user)
    showAllUsersModel(result => {
      res.send({
        success: true,
        message: 'List users',
        data: result
      })
    })
  },
  getDetailUser: (req, res) => {
    // console.log(req.user)
    const { id } = req.user
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
    const { id } = req.user
    const { name, email, phone, gender, birth } = req.body
    // const salt = bcrypt.genSaltSync(10)
    // const hashedPassword = bcrypt.hashSync(password, salt)
    const data = Object.entries(req.body).map(item => {
      return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}="${item[1]}"`
    })

    if (name || email || phone || gender || birth) {
      getUserByEmail(email, result => {
        if (result.length) {
          if (!result[0].id == id) {
            res.status(401).send({
              success: false,
              message: 'email already exist'
            })
          } else {
            if (req.file == undefined) {
              changeUserModel2(id, data, birth, result => {
                res.send({
                  success: true,
                  message: `user ${id} has been updated`,
                  data: {
                    ...req.body
                    // password: hashedPassword,
                  }
                })
              })
            } else {
              const { filename } = req.file
              const urlPicture = `${process.env.APP_URL}uploads/${filename}`
              changeUserModel(id, data, urlPicture, birth, result => {
                console.log(result)
                res.send({
                  success: true,
                  message: `user ${id} has been updated`,
                  data: {
                    ...req.body,
                    // password: hashedPassword,
                    picture: urlPicture
                  }
                })
              })
            }
          }
        } else {
          if (req.file == undefined) {
            changeUserModel2(id, data, birth, result => {
              res.send({
                success: true,
                message: `user ${id} has been updated`,
                data: {
                  ...req.body
                  // password: hashedPassword,
                }
              })
            })
          } else {
            const { filename } = req.file
            const urlPicture = `${process.env.APP_URL}uploads/${filename}`
            changeUserModel(id, data, urlPicture, birth, result => {
              console.log(result)
              res.send({
                success: true,
                message: `user ${id} has been updated`,
                data: {
                  ...req.body,
                  // password: hashedPassword,
                  picture: urlPicture
                }
              })
            })
          }
        }
      })
    }
  },
  addAddress: (req, res) => {
    const { id } = req.user
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
    const { id } = req.user
    showAddressModel(id, result => {
      res.status(200).send({
        success: true,
        data: result
      })
    })
  },
  editAddress: (req, res) => {
    const { id } = req.user
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
    const { id } = req.user
    deleteUserModel(id, _result => {
      res.send({
        success: true,
        message: `user ${id} deleted`
      })
    })
  }
}
