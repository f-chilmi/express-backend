const { Router } = require('express')

const { showAllItems, getDetailItem, createItem, changeItem, updatePartial, deleteItem } = require('../controllers/items')

const router = Router()

router.get('/items', showAllItems)
router.get('/items/:id', getDetailItem)
router.post('/items', createItem)
router.put('/items/:id', changeItem)
router.patch('/items/:id', updatePartial)
router.delete('/items/:id', deleteItem)

module.exports = router
