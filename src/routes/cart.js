const { Router } = require('express')

const { addToCart, showCartList, updateQty, deleteItemOnCart } = require('../controllers/cart')

const router = Router()

router.post('/', addToCart)
router.get('/', showCartList)
router.patch('/', updateQty)
router.delete('/:id', deleteItemOnCart)

module.exports = router
