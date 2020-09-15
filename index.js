const express = require('express')
const bodyParser = require('body-parser')

// router
const itemsRouter = require('./src/routes/items')
const categoryRouter = require('./src/routes/category')
const cartRouter = require('./src/routes/cart')

const app = express()

// middleware
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', itemsRouter)
app.use('/', categoryRouter)
app.use('/', cartRouter)

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
