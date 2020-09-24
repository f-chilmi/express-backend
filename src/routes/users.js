const { Router } = require('express')

const {
  showAllUsers,
  getDetailUser,
  createNewUser,
  changeUser,
  deteleUser
} = require('../controllers/users')

const router = Router()

const uploadHelper = require('../helpers/upload')

router.get('/', showAllUsers)
router.get('/:id', getDetailUser)
router.post('/', uploadHelper.single('picture'), createNewUser)
router.put('/:id', uploadHelper.single('picture'), changeUser)
router.delete('/:id', deteleUser)

module.exports = router
