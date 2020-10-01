const { Router } = require('express')

const { showAllItems, getDetailItem } = require('../controllers/items')
// const { showAllItems } = require('../controllers/items')

const router = Router()

router.get('/', showAllItems)
router.get('/items/:id', getDetailItem)
router.get('/category', showAllItems)

module.exports = router
