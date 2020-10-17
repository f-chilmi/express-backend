const db = require('../helpers/db')
const table = 'items'
const table2 = 'category'

module.exports = {
  getItemsWithCategoryModel: (searchkey, searchValue, sortKey, sortValue, cb) => {
    db.query(`SELECT ${table}.id, ${table}.name, ${table}.price, ${table2}.category, ${table}.description FROM ${table} LEFT JOIN ${table2} ON ${table}.category_id = ${table2}.id WHERE ${searchkey} LIKE '%${searchValue}%' ORDER BY ${sortKey} ${sortValue}`, (_err, result, _field) => {
      cb(result)
    })
  },
  showCategoryModel: (cb) => {
    db.query(`SELECT * FROM ${table2}`, (_err, result, _field) => {
      cb(result)
    })
  }
}
