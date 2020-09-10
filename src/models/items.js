const db = require('../helpers/db')
const table = 'items'

module.exports = {
  getItemModel: (id, cb) => {
    db.query(`SELECT * FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, description) VALUE ('${arr[0]}', ${arr[1]}, "${arr[2]}")`, (_err, result, _field) => {
      cb(result)
    })
  },
  updateItemModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET name="${arr[0]}", price=${arr[1]}, description="${arr[2]}" WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  updatePartialModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET ${arr} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteItemModel: (id, cb) => {
    db.query(`DELETE FROM ${table} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getItemModelByCondition: (obj1, obj2, num1, num2, cb) => {
    db.query(`SELECT * FROM ${table} WHERE ${obj1} LIKE '%${obj2}%' LIMIT ${num1} OFFSET ${num2}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getInfoItemsModel: (obj1, obj2, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${obj1} LIKE '%${obj2}%'`, (_err, data, _field) => {
      cb(data)
    })
  }
}
