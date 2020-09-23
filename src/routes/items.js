const { Router } = require('express')

const { showAllItems, getDetailItem, createItem, changeItem, updatePartial, deleteItem } = require('../controllers/items')

const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/', showAllItems)
router.get('/:id', getDetailItem)
router.post('/', uploadHelper.single('picture'), createItem)
router.put('/:id', changeItem)
router.patch('/:id', updatePartial)
router.delete('/:id', deleteItem)

module.exports = router
