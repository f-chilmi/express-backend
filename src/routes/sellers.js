const { Router } = require('express')

const {
  showDetailSeller,
  changeSeller
} = require('../controllers/sellers')
const {
  createItem,
  getDetailByIdSeller,
  updateItemsByIdSeller
} = require('../controllers/items')

const router = Router()

const authMiddleware = require('../middleware/auth')
const uploadHelper = require('../helpers/upload')

router.get('/', showDetailSeller)
// router.patch('/:id', uploadHelper.single('picture'), changeSeller)
router.post('/items', authMiddleware, uploadHelper.array('picture', 4), createItem)
router.get('/items', authMiddleware, getDetailByIdSeller)
router.patch('/items/:id', authMiddleware, uploadHelper.array('picture', 4), updateItemsByIdSeller)
// router.post('/', uploadHelper.single('picture'), createNewUser)
// router.post('/:id/address/create', addAddress)
// router.get('/:id/address', showAddress)
// router.patch('/:id/address/edit', editAddress)
// router.delete('/:id', deteleUser)

module.exports = router
