const { Router } = require('express')

const { showAllItems, getDetailItem } = require('../controllers/items')
const { showCategory } = require('../controllers/category')

const router = Router()

router.get('/', showAllItems)
router.get('/items/:id', getDetailItem)
router.get('/category', showAllItems)
router.get('/subcategory', showCategory)

module.exports = router
