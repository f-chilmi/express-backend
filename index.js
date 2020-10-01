const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// router
const itemsRouter = require('./src/routes/items')
const categoryRouter = require('./src/routes/category')
const cartRouter = require('./src/routes/cart')
const usersRoute = require('./src/routes/users')
const sellersRoute = require('./src/routes/sellers')
const authRoute = require('./src/routes/auth')
const publicRouter = require('./src/routes/public')
const checkoutRouter = require('./src/routes/checkout')

const app = express()

// import static files
app.use('/uploads', express.static('assets/uploads'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// middleware
const authMiddleware = require('./src/middleware/auth')

app.use('/public', publicRouter)
app.use('/items', itemsRouter)
app.use('/category', categoryRouter)
app.use('/auth', authRoute)
app.use('/users', authMiddleware, usersRoute)
app.use('/cart', authMiddleware, cartRouter)
app.use('/checkout', authMiddleware, checkoutRouter)
app.use('/sellers', authMiddleware, sellersRoute)

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
