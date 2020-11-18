const { showCartListModel, postNewTrxModel, postNewTrxDetailModel, getDataTrx } = require('../models/cart')
const { showAddressPrimaryModel, showSaldoUserModel, postNewOrderModel } = require('../models/users')

module.exports = {
  showList: (req, res) => {
    const { id } = req.user
    showAddressPrimaryModel(id, address => {
      showCartListModel(id, product => {
      // console.log(result.length)
        if (product.length) {
          const total = product.map(item => item.price * item.quantity)
          product = product.map(item => {
            return {
              ...item,
              total: item.price * item.quantity
            }
          })
          const add = (accumulator, currentValue) => accumulator + currentValue
          const shippingCost = 10000
          const totalPrice = total.reduce(add)
          const totalAll = shippingCost + totalPrice
          res.status(200).send({
            success: true,
            message: 'Cart list',
            data: {
              address,
              product
            },
            'shipping cost': shippingCost,
            'total price': totalPrice,
            total: totalAll
          })
        }
      })
    })
  },
  showPayments: (req, res) => {
    const { id } = req.user
    showAddressPrimaryModel(id, address => {
      showCartListModel(id, product => {
        const total = product.map(item => item.price * item.quantity)
        product = product.map(item => {
          return {
            ...item,
            total: item.price * item.quantity
          }
        })
        const add = (accumulator, currentValue) => accumulator + currentValue
        const shippingCost = 10000
        const totalPrice = total.reduce(add)
        const totalAll = shippingCost + totalPrice
        showSaldoUserModel(id, result => {
          // console.log(result[0].saldo)
          if (result[0].saldo > totalAll) {
            res.send({
              success: true,
              message: 'pay with blanjaCash',
              saldo: result[0].saldo,
              total: totalAll
            })
          } else {
            res.status(200).send({
              success: true,
              message: 'blanjaCash balance is not enough. top up now',
              saldo: result[0].saldo,
              total: totalAll
            })
          }
        })
      })
    })
  },
  postNewOrder: (req, res) => {
    const { id } = req.user
    const {seller_id, items_id, name, quantity, price, total, picture} = req.body
    postNewTrxModel(id, seller_id, result => {
      const trx_id = result.insertId
      postNewTrxDetailModel([trx_id, items_id, name, quantity, price, total, picture], result1 => {
        res.status(200).send({
          success: true,
          message: 'success add trx',
          result: req.body
        })
      })
    })
  },
  showTrx: (req, res) => {
    const { id } = req.user
    getDataTrx(id, result => {
      res.send({
        result
      })
    })
  }

}
