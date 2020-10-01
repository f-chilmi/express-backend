const db = require('../helpers/db')
const table1 = 'items'
const table2 = 'cart'

module.exports = {
  addToCartModel: (arr, cb) => {
    db.query(`INSERT INTO ${table2} (user_id, items_id, quantity) VALUES (${arr[0]}, ${arr[1]}, ${arr[2]})`, (_err, result, field) => {
      cb(result)
    })
  },
  showCartListModel: (id, cb) => {
    db.query(`SELECT ${table2}.id, ${table1}.name, ${table1}.price, ${table2}.quantity FROM ${table1} INNER JOIN ${table2} ON ${table1}.id = ${table2}.items_id WHERE user_id=${id}`, (_err, result, field) => {
      // console.log(_err)
      cb(result, _err)
    })
  },
  updateQtyModel: (id, qty, cb) => {
    db.query(`UPDATE ${table2} SET quantity = ${qty} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  deleteItemOnCartModel: (id, cb) => {
    db.query(`DELETE FROM ${table2} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  },
  checkId: (id, cb) => {
    db.query(`SELECT * FROM ${table2} WHERE id=${id}`, (_err, result, field) => {
      cb(result)
    })
  }
}
