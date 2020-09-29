const db = require('../helpers/db')
// const table = 'items'
// const table2 = 'category'
// const table3 = 'items_picture'
// const table4 = 'users'
// const table5 = 'address_user'
const table6 = 'sellers'

module.exports = {
  showDetailSellerModel: (id, cb) => {
    db.query(`SELECT * FROM ${table6} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  checkEmailSellerModel: (email, cb) => {
    db.query(`SELECT * FROM ${table6} WHERE email="${email}"`, (_err, result, _field) => {
      cb(result)
    })
  },
  createSellerModel: (arr, cb) => {
    const query1 = `INSERT INTO ${table6} (name, email, phone, storeName, password) VALUE ("${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}", "${arr[4]}")`
    db.query(query1, (_err, result, _field) => {
      cb(result)
    })
  }
}
