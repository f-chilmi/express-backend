const {
  showDetailSellerModel
} = require('../models/sellers')

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
  }
}
