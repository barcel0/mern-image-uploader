const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
const config = require('config');
const AWS_ACCESS_KEY_ID = config.get('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY_ID = config.get('AWS_SECRET_ACCESS_KEY_ID');

const s3 = new aws.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
  Bucket: 'mernimageuploader'
});

// Single image uploade
const userImageUploadSingle = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mernimageuploader',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now() + '-' + req.params.id + '-' + path.basename(file.originalname));
      // cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('userImage');


// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype); if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = userImageUploadSingle;