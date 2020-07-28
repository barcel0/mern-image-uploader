const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    // cb(null, './uploads/img');
    cb(null, path.resolve(__dirname, './client/public/upload/img/user'));
  },
  filename: function (req, file, cb) {
    //generate unique name for each image
    cb(null, Date.now() + '-' + req.params.id + '-' + path.basename(file.originalname));
  }
})

const fileFilter = (req, file, cb) => {
  cb(null, true);
}

let upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

module.exports = upload.single('userImage');