const { Router } = require('express')

const { showItemsWithCategory } = require('../controllers/category')

const router = Router()

router.get('/category', showItemsWithCategory)

module.exports = router
