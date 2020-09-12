const { Router } = require('express')
const { showItemsByCategory } = require('../controllers/category')

const router = Router()

router.get('/category', showItemsByCategory)
// router.get('/:id', getDetailItem)
// router.post('/', createItem)
// router.put('/:id', changeItem)
// router.patch('/:id', updatePartial)
// router.delete('/:id', deleteItem)

module.exports = router
