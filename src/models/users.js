const db = require('../helpers/db')
const table = 'items'
const table2 = 'category'
const table3 = 'items_picture'
const table4 = 'users'

module.exports = {
  showAllUsersModel: (cb) => {
    const query1 = `SELECT * FROM ${table4}`
    db.query(query1, (_err, result, _field) => {
      cb(result)
    })
  },
  showDetailUserModel: (id, cb) => {
    db.query(`SELECT * FROM ${table4} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  createNewUserModel: (arr, cb) => {
    db.query(`INSERT INTO ${table4} (name, email) VALUE ("${arr[0]}", "${arr[1]}")`, (_err, result, _field) => {
      cb(result)
    })
  },
  changeUserModel: (id, arr, cb) => {
    db.query(`UPDATE ${table4} SET name="${arr[0]}", email="${arr[1]}" WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteUserModel: (id, cb) => {
    db.query(`DELETE FROM ${table4} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  }
}
