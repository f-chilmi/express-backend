// const db = require('../helpers/db')

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

    //   db.query(`INSERT INTO cart (items_id, quantity) VALUES (${itemsId}, ${quantity})`, (err, result, _field) => {
    //     console.log(err)
    //     if (!err) {
    //       res.status(201).send({
    //         success: true,
    //         message: 'Item has been created',
    //         data: req.body,
    //         data1: result
    //       })
    //     } else {
    //       console.log(err)
    //       res.status(500).send('err')
    //     }
    //   })
    // }
  },
  showCartList: (req, res) => {
    showCartListModel(result => {
      const total = result.map(item => {
        return item.price * item.quantity
      })
      res.status(201).send({
        success: true,
        message: 'Cart list',
        data: {
          result,
          'total price': total
        }
      })
    })
    // const query2 = 'SELECT cart.id, items.name, items.price, cart.quantity FROM items INNER JOIN cart ON items.id = cart.items_id'
    // db.query(query2, (err, result, _field) => {
    //   const total = result.map(item => {
    //     return item.price * item.quantity
    //   })
    //   if (!err) {
    //     res.status(201).send({
    //       success: true,
    //       message: 'Cart list',
    //       data: {
    //         result,
    //         'total price': total
    //       }
    //     })
    //   } else {
    //     console.log(err)
    //     res.status(500).send('err')
    //   }
    // })
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
    // db.query(`UPDATE cart SET quantity = ${quantity} WHERE id=${id}`, (err, result, field) => {
    //   console.log(err)
    //   res.send({
    //     success: true,
    //     message: `id ${id} has been updated on your cart`
    //   })
  },
  deleteItemOnCart: (req, res) => {
    const { id } = req.params
    deleteItemOnCartModel(id, result => {
      res.send({
        success: true,
        message: `item ${id} has been deleted`
      })
    })
    // db.query(`DELETE FROM cart WHERE id=${id}`, (err, result, field) => {
    //   console.log(err)
    //   res.send({
    //     success: true,
    //     message: `item ${id} has been deleted`
    //   })
    // })
  }
}
