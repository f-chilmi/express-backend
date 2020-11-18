const db = require('../helpers/db')
const table1 = 'items'
const table2 = 'cart'
const table3 = 'items_picture'
const table4 = 'transaction'
const table5 = 'transaction_detail'

module.exports = {
  addToCartModel: (arr, cb) => {
    db.query(`INSERT INTO ${table2} (user_id, items_id, quantity) VALUES (${arr[0]}, ${arr[1]}, ${arr[2]})`, (_err, result, _field) => {
      cb(result)
    })
  },
  showCartListModel: (id, cb) => {
    db.query(`SELECT ${table2}.id, ${table2}.items_id, ${table1}.name, ${table1}.price, ${table2}.quantity, ${table3}.picture1 FROM ${table1} INNER JOIN ${table2} ON ${table1}.id = ${table2}.items_id INNER JOIN ${table3} ON ${table1}.id = ${table3}.items_id WHERE user_id=${id}`, (_err, result, _field) => {
      // console.log(_err)
      cb(result, _err)
    })
  },
  updateQtyModel: (id, itemsId, qty, cb) => {
    db.query(`UPDATE ${table2} SET quantity = ${qty} WHERE items_id=${itemsId} AND user_id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteItemOnCartModel: (id, cb) => {
    db.query(`DELETE FROM ${table2} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  checkId: (id, cb) => {
    db.query(`SELECT * FROM ${table2} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  checkItemsIdModel: (id, itemsId, cb) => {
    db.query(`SELECT * FROM ${table2} WHERE items_id=${itemsId} AND user_id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  postNewTrxModel: (id, seller_id, cb) => {
    db.query(`INSERT INTO ${table4} (user_id, seller_id) VALUES (${id}, ${seller_id})`, (_err, result, _field) => {
      cb(result)
    })
  },
  postNewTrxDetailModel: (arr, cb) => {
    db.query(`INSERT INTO ${table5} (trx_id, items_id, name, quantity, price, total, picture) VALUE (${arr[0]}, ${arr[1]}, '${arr[2]}', ${arr[3]}, ${arr[4]}, ${arr[5]}, '${arr[6]}')`, (err, result, _field) => {
      console.log(err) 
      cb(result)
    })
  },
  getDataTrx: (id, cb) => {
    db.query(`SELECT ${table4}.id, ${table4}.seller_id, ${table5}.name, ${table5}.quantity, ${table5}.price, ${table5}.total, ${table5}.picture, ${table4}.created_at FROM ${table4} LEFT JOIN ${table5} ON ${table4}.id=${table5}.trx_id WHERE user_id=${id}`, (_err, result, _field) => {
      console.log(_err)
      cb(result)
    })
  }
}
