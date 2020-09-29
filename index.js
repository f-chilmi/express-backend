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

const app = express()

// import static files
app.use('/uploads', express.static('assets/uploads'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// middleware
const authMiddleware = require('./src/middleware/auth')

app.use('/items', itemsRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)
app.use('/users', authMiddleware, usersRoute)
app.use('/sellers', authMiddleware, sellersRoute)
app.use('/auth', authRoute)

app.listen(8080, () => {
  console.log('App listening on port 8080')
})
