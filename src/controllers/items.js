const qs = require('querystring')
const { getItemModel, createItemModel, updateItemModel, updatePartialModel, deleteItemModel, getItemModelByCondition, getInfoItemsModel } = require('../models/items')
// const { count } = require('console')

module.exports = {
  getDetailItem: (req, res) => {
    const { id } = req.params
    getItemModel(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'detail item',
          data: result
        })
      } else {
        res.send({
          success: false,
          message: `Id ${id} not found`
        })
      }
    })
  },
  createItem: (req, res) => {
    const { name, price, description } = req.body
    if (name && price && description) {
      createItemModel([name, price, description], result => {
        res.status(201).send({
          success: true,
          message: 'Item has been created',
          data: req.body
        })
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'All field must be filled'
      })
    }
  },
  changeItem: (req, res) => {
    const { id } = req.params
    const { name, price, description } = req.body
    console.log(name, price, description)
    if (name.trim() && price.trim() && description.trim()) {
      getItemModel(id, result => {
        if (result.length) {
          updateItemModel(id, [name, price, description], result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `Item ${id} has been updated`
              })
            } else {
              res.send({
                success: false,
                message: 'Failed update data'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Item ${id} not found`
          })
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'All field must be filled'
      })
    }
  },
  updatePartial: (req, res) => {
    const { id } = req.params
    const { name, price, description } = req.body
    if (name.trim() || price.trim() || description.trim()) {
      getItemModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          console.log(data)
          updatePartialModel(id, data, result => {
            if (result.affectedRows) {
              res.send({
                success: true,
                message: `item ${id} has been updated`,
                result: req.body
              })
            } else {
              res.send({
                success: false,
                message: 'Failed update data'
              })
            }
          })
        } else {
          res.send({
            success: false,
            message: `Data id = ${id} not found`
          })
        }
      })
    }
  },
  deleteItem: (req, res) => {
    const { id } = req.params
    getItemModel(id, result => {
      if (result.length) {
        deleteItemModel(id, result => {
          res.send({
            success: true,
            message: 'item deleted'
          })
        })
      } else {
        res.send({
          success: false,
          message: `Id ${id} not found`
        })
      }
    })
  },
  showAllItems: (req, res) => {
    let { page, limit, search } = req.query
    // console.log(req.query)
    let searchKey = ''
    let searchValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'name'
      searchValue = ''
    }
    if (!limit) {
      limit = 5
    } else {
      limit = parseInt(limit)
    }
    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }
    const offset = (page - 1) * limit
    getItemModelByCondition(searchKey, searchValue, limit, offset, result => {
      const pageInfo = {
        count: 0,
        pages: 1,
        currentPage: page,
        limitPerPage: limit,
        nextLink: null,
        prevLink: null
      }
      if (result.length) {
        getInfoItemsModel(searchKey, searchValue, data => {
          const { count } = data[0]
          pageInfo.count = count
          pageInfo.pages = Math.ceil(count / limit)
          const { pages, currentPage } = pageInfo
          if (currentPage < pages) {
            pageInfo.nextLink = `http://localhost:8080/?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
          }
          if (currentPage > 1) {
            pageInfo.prevLink = `http://localhost:8080/?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
          }
          res.send({
            success: true,
            message: 'List of items',
            info: result,
            pageInfo
          })
        })
        // const query = `SELECT COUNT(*) AS count FROM items WHERE ${searchKey} LIKE '%${searchValue}%'`
        // db.query(query, (_err, data, field) => {
        //   console.log(query)
        //   const { count } = data[0]
        //   pageInfo.count = count
        //   pageInfo.pages = Math.ceil(count / limit)
        //   const { pages, currentPage } = pageInfo
        //   if (currentPage < pages) {
        //     pageInfo.nextLink = `http://localhost:8080/?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
        //   }
        //   if (currentPage > 1) {
        //     pageInfo.prevLink = `http://localhost:8080/?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
        //   }
        //   res.send({
        //     success: true,
        //     message: 'List of items',
        //     data: result,
        //     pageInfo
        //   })
        // })
      } else {
        res.send({
          success: true,
          message: 'There is no item on list',
          pageInfo
        })
      }
    })
  }
}
