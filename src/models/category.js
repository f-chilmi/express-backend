const db = require('../helpers/db')
const table1 = 'items'
const table2 = 'category'

module.exports = {
  getCategoryModel: (cb) => {
    db.query(`SELECT ${table1}.name, ${table1}.category_id, ${table1}.price, ${table1}.description, ${table2}.id, ${table2}.name FROM ${table1} INNER JOIN ${table2} ON ${table1}.category_id = ${table2}.id`, (_err, result, _field) => {
      cb(_err, result)
      console.log(_err)
    })
  }
}
