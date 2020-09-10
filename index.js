const express = require('express')
const bodyParser = require('body-parser')

const itemsRouter = require('./src/routes/items')
// const { getDetailItem } = require('./src/controllers/items')

const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', itemsRouter)

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
