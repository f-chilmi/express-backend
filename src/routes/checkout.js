const { Router } = require('express')

const { showList, showPayments, postNewOrder } = require('../controllers/checkout')

const router = Router()

router.get('/', showList)
router.get('/payments', showPayments)
router.post('/transaction', postNewOrder)

module.exports = router
