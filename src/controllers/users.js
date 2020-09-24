const {
  showAllUsersModel,
  showDetailUserModel,
  createNewUserModel,
  changeUserModel,
  deleteUserModel
} = require('../models/users')

module.exports = {
  showAllUsers: (req, res) => {
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
    const { name, email } = req.body
    createNewUserModel([name, email], result => {
      res.send({
        success: true,
        message: 'user created',
        data: req.body
      })
    })
  },
  changeUser: (req, res) => {
    const { id } = req.params
    const { name, email } = req.body
    if (name && email) {
      changeUserModel(id, [name, email], result => {
        res.send({
          success: true,
          message: `user ${id} has been updated`,
          data: req.body
        })
      })
    }
  },
  deteleUser: (req, res) => {
    const { id } = req.params
    deleteUserModel(id, result => {
      res.send({
        success: true,
        message: `user ${id} deleted`
      })
    })
  }
}
