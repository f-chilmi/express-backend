const { addToCartModel, showCartListModel, updateQtyModel, deleteItemOnCartModel, checkId, checkItemsIdModel } = require('../models/cart')

module.exports = {
  addToCart: (req, res) => {
    const { id } = req.user
    const { itemsId, quantity } = req.body
    if (itemsId && quantity) {
      checkItemsIdModel(id, itemsId, result1 => {
        if (result1.length > 0) {
          const qtyUpdated = parseInt(quantity) + parseInt(result1[0].quantity)
          updateQtyModel(id, itemsId, qtyUpdated, _result => {
            res.send({
              success: true,
              message: `id ${id} has been updated on your cart`
            })
          })
        } else {
          addToCartModel([id, itemsId, quantity], _result => {
            res.status(201).send({
              success: true,
              message: 'Item added to cart',
              data: req.body
            })
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: 'All field (itemsId and quantity) must be filled'
      })
    }
  },
  showCartList: (req, res) => {
    const { id } = req.user
    showCartListModel(id, result => {
      // console.log(result.length)
      if (result.length) {
        const total = result.map(item => item.price * item.quantity)
        result = result.map(item => {
          return {
            ...item,
            total: item.price * item.quantity
          }
        })
        const add = (accumulator, currentValue) => accumulator + currentValue
        const totalPrice = total.reduce(add)
        res.status(201).send({
          success: true,
          message: 'Cart list',
          data: result,
          'total price': totalPrice
        })
      } else {
        res.send({
          success: true,
          message: 'cart is empty'
        })
      }
    })
  },
  updateQty: (req, res) => {
    const { id } = req.user
    const { itemsId, quantity } = req.body
    checkItemsIdModel(id, itemsId, result => {
      if (result.length) {
        updateQtyModel(id, itemsId, quantity, _result => {
          res.send({
            success: true,
            message: `id ${itemsId} has been updated on your cart`
          })
        })
      } else {
        res.send({
          success: false,
          message: `id ${id} not found`
        })
      }
    })
  },
  deleteItemOnCart: (req, res) => {
    const { id } = req.params
    deleteItemOnCartModel(id, _result => {
      res.send({
        success: true,
        message: `item ${id} has been deleted`
      })
    })
  }
}
