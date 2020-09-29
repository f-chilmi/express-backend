const {
  showDetailSellerModel
} = require('../models/sellers')

module.exports = {
  showDetailSeller: (_req, res) => {
    showDetailSellerModel(result => {
      res.send({
        success: true,
        message: 'List users',
        data: result
      })
    })
  }
}
