const qs = require('querystring')
const {
  getItemModel,
  createItemModel,
  updateItemModel,
  updatePartialModel,
  deleteItemModel,
  getItemModelByCondition,
  getInfoItemsModel,
  getItem2Model,
  addPictureModel,
  updatePictureModel,
  getPictureByIdModel
} = require('../models/items')

module.exports = {
  getDetailItem: (req, res) => {
    const { id } = req.params
    getItem2Model(id, result => {
      if (result.length) {
        res.send({
          success: true,
          message: 'detail item',
          data: result[0]
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
    const { name, price, category, description } = req.body
    // const { picture } = req.files
    // console.log(req.files)
    if (name && price && category && description & req.files.length) {
      createItemModel([name, price, category, description], result => {
        const { insertId } = result
        req.files.map(i => {
          const filename = i.filename
          const urlPicture = `${process.env.APP_URL}uploads/${filename}`
          // dibuatkan async untuk addpicture
          addPictureModel(insertId, urlPicture, result => {
            console.log(result)
            console.log(insertId)
            res.status(201).send({
              success: true,
              message: 'Item has been created',
              data: {
                ...req.body
              }
            })
          })
        })
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'All field(name, price, category, description, picture) must be filled'
      })
    }
  },
  changeItem: (req, res) => {
    const { id } = req.params
    const { name, price, description, category } = req.body
    if (name.trim() && price && description && category) {
      getItemModel(id, result => {
        if (result.length) {
          updateItemModel(id, [name.trim(), price, description.trim(), category], result => {
            const { affectedRows } = result
            getPictureByIdModel(id, result => {
              console.log(result)
              if (result.length) {
                req.files.map(i => {
                  const filename = i.filename
                  const urlPicture = `${process.env.APP_URL}uploads/${filename}`
                  updatePictureModel(id, urlPicture, result => {
                    console.log(result)
                    if (affectedRows) {
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
                })
              } else {
                req.files.map(i => {
                  const filename = i.filename
                  const urlPicture = `${process.env.APP_URL}uploads/${filename}`
                  addPictureModel(id, urlPicture, result => {
                    console.log(result)
                    if (affectedRows) {
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
                })
              }
            })
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
        message: 'All field (name, price, category and description) must be filled!'
      })
    }
  },
  updatePartial: (req, res) => {
    const { id } = req.params
    const { name, price, description, category_id } = req.body
    if (name.trim() || price.trim() || description.trim() || category_id.trim()) {
      getItemModel(id, result => {
        if (result.length) {
          const data = Object.entries(req.body).map(item => {
            return parseInt(item[1]) > 0 ? `${item[0]}=${item[1]}` : `${item[0]}='${item[1]}'`
          })
          updatePartialModel(id, data, result => {
            const { affectedRows } = result
            if (req.files > 0) {
              console.log(typeof req.files.length)
              getPictureByIdModel(id, result => {
                // console.log(result)
                if (result.length) {
                  req.files.map(i => {
                    const filename = i.filename
                    const urlPicture = `${process.env.APP_URL}uploads/${filename}`
                    updatePictureModel(id, urlPicture, result => {
                      console.log(result)
                      if (affectedRows) {
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
                  })
                } else {
                  req.files.map(i => {
                    const filename = i.filename
                    const urlPicture = `${process.env.APP_URL}uploads/${filename}`
                    addPictureModel(id, urlPicture, result => {
                      console.log(result)
                      if (affectedRows) {
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
                  })
                }
              })
            } else {
              if (affectedRows) {
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
    let { page, limit, search, sort } = req.query
    let searchKey = 'name'
    let searchValue = ''
    let sortKey = ''
    let sortValue = ''
    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchValue = search || ''
    }

    if (typeof sort === 'object') {
      sortKey = Object.keys(sort)[0]
      sortValue = Object.values(sort)[0]
    } else {
      sortKey = 'id'
      sortValue = sort || 'asc' || ''
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
    // console.log(Object.values(search)[0])
    // console.log(sortKey + sortValue)
    getItemModelByCondition(searchKey, searchValue, sortKey, sortValue, limit, offset, result => {
      const pageInfo = {
        count: 0,
        pages: 1,
        currentPage: page,
        limitPerPage: limit,
        nextLink: null,
        prevLink: null
      }
      // console.log(result)
      if (result.length) {
        getInfoItemsModel(searchKey, searchValue, data => {
          // console.log(data)
          const { count } = data[0]
          pageInfo.count = count
          pageInfo.pages = Math.ceil(count / limit)
          const { pages, currentPage } = pageInfo
          if (currentPage < pages) {
            pageInfo.nextLink = `${process.env.APP_URL}?${qs.stringify({ ...req.query, ...{ page: page + 1 } })}`
          }
          if (currentPage > 1) {
            pageInfo.prevLink = `${process.env.APP_URL}?${qs.stringify({ ...req.query, ...{ page: page - 1 } })}`
          }
          res.send({
            success: true,
            message: 'List of items',
            info: result,
            pageInfo
          })
        })
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
