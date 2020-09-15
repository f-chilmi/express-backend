const { addToCartModel, showCartListModel, updateQtyModel, deleteItemOnCartModel, checkId } = require('../models/cart')

module.exports = {
  addToCart: (req, res) => {
    const { itemsId, quantity } = req.body
    if (itemsId && quantity) {
      addToCartModel([itemsId, quantity], result => {
        res.status(201).send({
          success: true,
          message: 'Item added to cart',
          data: req.body
        })
      })
    } else {
      res.send({
        success: false,
        message: 'All field (itemsId and quantity) must be filled'
      })
    }
  },
  showCartList: (req, res) => {
    showCartListModel(result => {
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
    })
  },
  updateQty: (req, res) => {
    const { id } = req.params
    const { quantity } = req.body
    checkId(id, result => {
      console.log(result)
      if (result.length) {
        updateQtyModel(id, quantity, result => {
          res.send({
            success: true,
            message: `id ${id} has been updated on your cart`
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
    deleteItemOnCartModel(id, result => {
      res.send({
        success: true,
        message: `item ${id} has been deleted`
      })
    })
  }
}
