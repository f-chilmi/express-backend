const db = require('../helpers/db')
// const table = 'items'
// const table2 = 'category'
// const table3 = 'items_picture'
const table4 = 'users'
const table5 = 'address_user'
const table6 = 'saldo_user'

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
    db.query(`INSERT INTO ${table4} (name, email, password, urlPicture) VALUE ("${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}")`, (_err, result, _field) => {
      cb(result)
    })
  },
  changeUserModel: (id, arr, password, urlPicture, birth, cb) => {
    db.query(`UPDATE ${table4} SET ${arr}, password="${password}", urlPicture="${urlPicture}", birth="${birth}" WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  deleteUserModel: (id, cb) => {
    db.query(`DELETE FROM ${table4} WHERE id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  getUserByConditions: (email, cb) => {
    db.query(`SELECT * FROM ${table4} WHERE email="${email}"`, (_err, result, _field) => {
      cb(result)
    })
  },
  getUserByEmail: (email, cb) => {
    db.query(`SELECT * FROM ${table4} WHERE email="${email}"`, (_err, result, _field) => {
      cb(result)
    })
  },
  addAddressModel: (id, nameAddress, recipientsName, recipientsPhone, address, postalCode, city, cb) => {
    db.query(`INSERT INTO ${table5} (user_id, nameAddress, recipientsName, recipientsPhone, address, postalCode, city) VALUE (${id}, "${nameAddress}", "${recipientsName}", "${recipientsPhone}", "${address}", "${postalCode}", "${city}")`, (_err, result, _field) => {
      cb(result)
    })
  },
  showAddressModel: (id, cb) => {
    db.query(`SELECT * FROM ${table5} WHERE user_id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  editAddressModel: (id, data, cb) => {
    db.query(`UPDATE ${table5} SET ${data} WHERE user_id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  },
  showAddressPrimaryModel: (id, cb) => {
    db.query(`SELECT * FROM ${table5} WHERE user_id=${id} AND isPrimary="true"`, (_err, result, _field) => {
      // console.log(_err)
      cb(result)
    })
  },
  showSaldoUserModel: (id, cb) => {
    db.query(`SELECT * FROM ${table6} WHERE user_id=${id}`, (_err, result, _field) => {
      cb(result)
    })
  }
}
