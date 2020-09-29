const route = require('express').Router()

const { loginController, signupController } = require('../controllers/auth')
const { loginSellerController, signupSellerController } = require('../controllers/auth')

// users
route.post('/login', loginController)
route.post('/signup', signupController)

// sellers
route.post('/sellers/login', loginSellerController)
route.post('/sellers/signup', signupSellerController)

module.exports = route
