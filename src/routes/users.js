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

router.get('/showAll', showAllUsers) // hanya bisa diakses oleh super admin harusnya
router.get('/', getDetailUser) // akses detail id dari token
router.post('/', uploadHelper.single('picture'), createNewUser)
router.patch('/', uploadHelper.single('picture'), changeUser)
router.post('/address/create', addAddress)
router.get('/address', showAddress)
router.patch('/address/edit', editAddress)
router.delete('/:id', deteleUser)

module.exports = router
