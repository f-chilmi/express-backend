const { Router } = require('express')

const { showList } = require('../controllers/checkout')

const router = Router()

router.get('/', showList)

module.exports = router
