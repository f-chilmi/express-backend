const db = require('../helpers/db')
const table = 'items'
const table2 = 'category'
const table3 = 'items_picture'
// const table4 = 'users'
// const table5 = 'address_user'
// const table6 = 'saldo_user'
const table7 = 'items_rating'

module.exports = {
  getItemModel: (id, cb) => {
    const query1 = `SELECT * FROM ${table} WHERE id=${id}`
    db.query(query1, (_err, result, _field) => {
      cb(result)
    })
  },
  getItemBySellerModel: (sellerId, id, cb) => {
    const query1 = `SELECT * FROM ${table} WHERE id=${id} AND seller_id=${sellerId}`
    db.query(query1, (_err, result, _field) => {
      // console.log(_err)
      cb(result)
    })
  },
  getItem2Model: (id, cb) => {
    const query2 = `SELECT ${table}.id, ${table}.name, ${table}.price, ${table2}.category, ${table3}.picture1, ${table}.description FROM ${table} LEFT JOIN ${table2} ON ${table}.category_id = ${table2}.id LEFT JOIN ${table3} ON ${table}.id = ${table3}.items_id WHERE ${table}.id = ${id}`
    db.query(query2, (_err, result, _field) => {
      cb(result)
    })
  },
  getItemSellerModel: (id, cb) => {
    // const query1 = `select * from items where seller_id = ${id}`
    const query2 = `SELECT ${table}.id, ${table}.name, ${table}.price, ${table2}.category, ${table3}.picture1, ${table}.description FROM ${table} LEFT JOIN ${table2} ON ${table}.category_id = ${table2}.id LEFT JOIN ${table3} ON ${table}.id = ${table3}.items_id WHERE ${table}.seller_id = "${id}"`
    db.query(query2, (_err, result, _field) => {
      // console.log(query2)
      cb(result)
    })
  },
  createItemModel: (id, arr, cb) => {
    db.query(`INSERT INTO ${table} (seller_id, name, price, category_id, description) VALUE (${id}, "${arr[0]}", ${arr[1]}, ${arr[2]}, "${arr[3]}")`, (_err, result, _field) => {
      cb(result)
    })
  },
  addPictureModel: (id, url, cb) => {
    db.query(`INSERT INTO ${table3} (items_id, picture1) VALUE (${id}, "${url}")`, (_err, result, _field) => {
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
    db.query(`UPDATE ${table3} SET picture1="${url}" WHERE items_id=${itemsId}`, (_err, result, _field) => {
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
    const query1 = `SELECT ${table}.id, ${table}.name, ${table}.price, ${table2}.category, ${table3}.picture1, ${table}.description, ${table}.updated_at FROM ${table} LEFT JOIN ${table2} ON ${table}.category_id = ${table2}.id LEFT JOIN ${table3} ON ${table}.id = ${table3}.items_id WHERE ${obj1} LIKE '%${obj2}%' ORDER BY ${sortKey} ${sortValue} LIMIT ${num1} OFFSET ${num2}`
    // const query2 = `select * from items WHERE ${obj1} LIKE '%${obj2}%' ORDER BY ${sortKey} ${sortValue} LIMIT ${num1} OFFSET ${num2}`
    db.query(query1, (_err, result, _field) => {
      // console.log(query2)
      // console.log(_err)
      cb(result)
    })
  },
  getInfoItemsModel: (obj1, obj2, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table} WHERE ${obj1} LIKE '%${obj2}%'`, (_err, data, _field) => {
      // console.log(_err)
      cb(data)
    })
  },
  averageRatingModel: (id, cb) => {
    db.query(`SELECT AVG(rating) FROM ${table7} WHERE items_id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  }
}
