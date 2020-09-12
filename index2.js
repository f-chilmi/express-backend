const express = require('express')
const bodyParser = require('body-parser')
// const db = require('./src/helpers/db')

// router
const itemsRouter = require('./src/routes/items')
// const categoryRouter = require('./src/routes/category')

const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', itemsRouter)
// app.use('/category', categoryRouter)

app.listen(8080, () => {
  console.log('App listening on port 8080')
})

// app.get('/category', (req, res) => {
//   db.query('SELECT * FROM category', (err, result, _field) => {
//     if (!err) {
//       console.log(result)
//       res.send({
//         success: true,
//         data: result
//       })
//     } else {
//       res.send('error')
//       console.log(err)
//     }
//   })
// })

// db.query1(`SELECT * FROM ${table} WHERE ${obj1} LIKE '%${obj2}%' LIMIT ${num1} OFFSET ${num2}`)
// db.query2(`SELECT ${table}.name, ${table}.category_id, ${table}.price, ${table}.description, ${table2}.id, ${table2}.name FROM ${table} INNER JOIN ${table2} ON ${table}.category_id = ${table2}.id`)

// if (typeof search === 'object') {
//   searchKey = Object.keys(search)[0]
//   searchValue = Object.values(search)[0]
// } else {
//   searchKey = 'name'
//   searchValue = ''
// }
