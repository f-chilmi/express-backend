const { Router } = require('express')

const { showList, showPayments } = require('../controllers/checkout')

const router = Router()

router.get('/', showList)
router.get('/payments', showPayments)

module.exports = router
