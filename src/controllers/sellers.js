const {
  showDetailSellerModel,
  checkEmailSellerModel,
  updateSellerModelPicture,
  updateSellerModel
} = require('../models/sellers')
const bcrypt = require('bcryptjs')

module.exports = {
  showDetailSeller: (req, res) => {
    const { id } = req.params
    showDetailSellerModel(id, result => {
      // const pass = result[0].password
      res.send({
        success: true,
        message: 'Detail seller',
        data: result
      })
    })
  },
  changeSeller: (req, res) => {
    const { id } = req.params
    const { name, email, phone, storeName, storeDesc } = req.body
    // const salt = bcrypt.genSaltSync(10)
    // const hashedPassword = bcrypt.hashSync(password, salt)
    const data = Object.entries(req.body).map(item => {
      return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}="${item[1]}"`
    })
    if (name || email || phone || storeName || storeDesc) {
      checkEmailSellerModel(email, result => {
        if (result.length) {
          if (result[0].id == id) {
            if (req.file) {
              const { filename } = req.file
              const urlPicture = `${process.env.APP_URL}uploads/${filename}`
              updateSellerModelPicture(id, data, urlPicture, result => {
                res.send({
                  success: true,
                  message: 'success edit data',
                  data: {
                    ...req.body,
                    storeImg: urlPicture
                  }
                })
              })
            } else {
              updateSellerModel(id, data, result => {
                res.send({
                  success: true,
                  message: 'success edit data',
                  data: req.body
                })
              })
            }
          } else {
            res.send({
              success: false,
              message: 'email already used'
            })
          }
        }
      })
    }
  }
}
