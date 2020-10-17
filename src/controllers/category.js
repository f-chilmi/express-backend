const { getItemsWithCategoryModel, showCategoryModel } = require('../models/category')

module.exports = {
  showCategory: (req, res) => {
    showCategoryModel(result => {
      res.send({
        success: true,
        message: 'category list',
        data: result
      })
    })
  },
  showItemsWithCategory: (req, res) => {
    const { search, sort } = req.query
    const searchKey = 'category'
    let searchValue = ''
    let sortKey = ''
    let sortValue = ''
    if (typeof search === 'object') {
      searchValue = Object.values(search)[0]
    } else {
      searchValue = search || ''
    }
    if (typeof sort === 'object') {
      sortKey = Object.keys(sort)[0]
      sortValue = Object.values(sort)[0]
    } else {
      sortKey = 'id'
      sortValue = 'ASC'
    }
    // console.log(sortKey, sortValue)

    getItemsWithCategoryModel(searchKey, searchValue, sortKey, sortValue, result => {
      res.send({
        success: true,
        data: result
      })
    })
  }
}
