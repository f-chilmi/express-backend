const db = require('../helpers/db')
const table = 'items'
const table2 = 'category'
const table3 = 'items_picture'

module.exports = {
  getItemModel: (id, cb) => {
    const query1 = `SELECT * FROM ${table} WHERE id=${id}`
    db.query(query1, (_err, result, _field) => {
      cb(result)
    })
  },
  getItem2Model: (id, cb) => {
    const query2 = `SELECT ${table}.id, ${table}.name, ${table}.price, ${table2}.category, ${table3}.picture, ${table}.description FROM ${table} LEFT JOIN ${table2} ON ${table}.category_id = ${table2}.id LEFT JOIN ${table3} ON ${table}.id = ${table3}.items_id WHERE ${table}.id = ${id}`
    db.query(query2, (_err, result, _field) => {
      cb(result)
    })
  },
  createItemModel: (arr, cb) => {
    db.query(`INSERT INTO ${table} (name, price, category_id, description) VALUE ("${arr[0]}", ${arr[1]}, ${arr[2]}, "${arr[3]}")`, (_err, result, _field) => {
      cb(result)
    })
  },
  addPictureModel: (id, url, cb) => {
    db.query(`INSERT INTO ${table3} (items_id, picture) VALUE (${id}, "${url}")`, (_err, result, _field) => {
      cb(result)
    })
  },
  updateItemModel: (id, arr, cb) => {
    db.query(`UPDATE ${table} SET name="${arr[0]}", price=${arr[1]}, description="${arr[2]}", category_id=${arr[3]} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getPictureByIdModel: (id, cb) => {
    db.query(`SELECT * FROM ${table3} WHERE items_id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  updatePictureModel: (itemsId, url, cb) => {
    db.query(`UPDATE ${table3} SET picture="${url}" WHERE items_id=${itemsId}`, (_err, result, _field) => {
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
  getItemModelByCondition: (obj1, obj2, sortKey, sortValue, num1, num2, cb) => {
    db.query(`SELECT ${table}.id, ${table}.name, ${table}.price, ${table2}.category, ${table3}.picture, ${table}.description, ${table}.updated_at FROM ${table} LEFT JOIN ${table2} ON ${table}.category_id = ${table2}.id LEFT JOIN ${table3} ON ${table}.id = ${table3}.items_id WHERE ${obj1} LIKE '%${obj2}%' ORDER BY ${sortKey} ${sortValue} LIMIT ${num1} OFFSET ${num2}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getInfoItemsModel: (obj1, obj2, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${obj1} LIKE '%${obj2}%'`, (_err, data, _field) => {
      cb(data)
    })
  }
}
