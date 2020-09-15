const { Router } = require('express')

const { addToCart, showCartList, updateQty, deleteItemOnCart } = require('../controllers/cart')

const router = Router()

router.post('/cart', addToCart)
router.get('/cart', showCartList)
router.patch('/cart/:id', updateQty)
router.delete('/cart/:id', deleteItemOnCart)

module.exports = router
