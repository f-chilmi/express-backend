const { Router } = require('express')
const { showAllItems } = require('../controllers/items')
const { getDetailItem } = require('../controllers/items')
const { createItem } = require('../controllers/items')
const { changeItem } = require('../controllers/items')
const { updatePartial } = require('../controllers/items')
const { deleteItem } = require('../controllers/items')

const router = Router()

router.get('/', showAllItems)
router.get('/:id', getDetailItem)
router.post('/', createItem)
router.put('/:id', changeItem)
router.patch('/:id', updatePartial)
router.delete('/:id', deleteItem)

module.exports = router
