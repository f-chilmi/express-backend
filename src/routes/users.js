const { Router } = require('express')

const {
  showAllUsers,
  getDetailUser,
  createNewUser,
  changeUser,
  addAddress,
  showAddress,
  editAddress,
  deteleUser
} = require('../controllers/users')

const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/', showAllUsers) // harusnya yg bisa akses ini adalah super admin
router.get('/:id', getDetailUser)
router.post('/', uploadHelper.single('picture'), createNewUser)
router.patch('/:id', uploadHelper.single('picture'), changeUser)
router.post('/:id/address/create', addAddress)
router.get('/:id/address', showAddress)
router.patch('/:id/address/edit', editAddress)
router.delete('/:id', deteleUser)

module.exports = router
