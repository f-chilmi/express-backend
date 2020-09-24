const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// router
const itemsRouter = require('./src/routes/items')
const categoryRouter = require('./src/routes/category')
const cartRouter = require('./src/routes/cart')
const usersRoute = require('./src/routes/users')

const app = express()

// import static files
app.use('/uploads', express.static('assets/uploads'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// middleware
// const authMiddleware = require('./src/middleware/auth')

app.use('/items', itemsRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)
app.use('/users', usersRoute)

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
