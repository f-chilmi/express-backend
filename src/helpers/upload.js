const multer = require('multer')

// const options = {
//   dest: 'assets/uploads'
// }

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads')
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
    console.log(ext)
    const filename = new Date().getTime().toString().concat('.').concat(ext)
    cb(null, filename)
  }
})

module.exports = multer({ storage })
