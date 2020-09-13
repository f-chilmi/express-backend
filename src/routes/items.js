const { Router } = require('express')

const { showAllItems, getDetailItem, createItem, changeItem, updatePartial, deleteItem, showItemsWithCategory } = require('../controllers/items')

const { addToCart, showCartList, updateQty, deleteItemOnCart } = require('../controllers/cart')

const router = Router()

router.get('/cart', showCartList)

router.get('/', showAllItems)
router.get('/category', showItemsWithCategory)
router.get('/:id', getDetailItem)
router.post('/', createItem)
router.put('/:id', changeItem)
router.patch('/:id', updatePartial)
router.delete('/:id', deleteItem)

router.post('/cart', addToCart)
// router.get('/cart', showCartList)
router.patch('/cart/:id', updateQty)
router.delete('/cart/:id', deleteItemOnCart)

module.exports = router
