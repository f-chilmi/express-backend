const { Router } = require('express')

const {
  showDetailSeller,
  changeSeller
} = require('../controllers/sellers')

const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/:id', showDetailSeller)
// router.post('/', uploadHelper.single('picture'), createNewUser)
router.patch('/:id', uploadHelper.single('picture'), changeSeller)
// router.post('/:id/address/create', addAddress)
// router.get('/:id/address', showAddress)
// router.patch('/:id/address/edit', editAddress)
// router.delete('/:id', deteleUser)

module.exports = router
