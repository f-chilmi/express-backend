const { Router } = require('express')

const { showList, showPayments, postNewOrder, showTrx } = require('../controllers/checkout')

const router = Router()

router.get('/', showList)
router.get('/payments', showPayments)
router.post('/transaction', postNewOrder)
router.get('/order', showTrx)

module.exports = router
