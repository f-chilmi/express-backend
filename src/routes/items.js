const { Router } = require('express')

const { showAllItems, getDetailItem, createItem, changeItem, updatePartial, deleteItem } = require('../controllers/items')

const router = Router()

const authMiddleware = require('../middleware/auth')
const uploadHelper = require('../helpers/upload')

router.get('/', showAllItems)
router.get('/:id', getDetailItem)
router.post('/', authMiddleware, uploadHelper.array('picture', 4), createItem)
router.put('/:id', authMiddleware, uploadHelper.array('picture', 4), changeItem)
router.patch('/:id', authMiddleware, uploadHelper.array('picture', 4), updatePartial)
router.delete('/:id', authMiddleware, deleteItem)

module.exports = router
