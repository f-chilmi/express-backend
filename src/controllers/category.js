// const qs = require('querystring')
// const { getCategoryModel } = require('../models/category')
const db = require('../helpers/db')

module.exports = {
  showItemsByCategory: (req, res) => {
    db.query('SELECT * FROM items', (err, result, _field) => {
      if (!err) {
        console.log(result)
        res.send({
          success: true,
          data: result
        })
      } else {
        res.send('error')
        console.log(err)
      }
    })
  }
}
