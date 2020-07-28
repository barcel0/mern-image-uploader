const aws = require('aws-sdk');
const config = require('config');
const AWS_ACCESS_KEY_ID = config.get('AWS_ACCESS_KEY_ID');
const AWS_SECRET_ACCESS_KEY_ID = config.get('AWS_SECRET_ACCESS_KEY_ID');

const awsFileDeletion = imagePath => {
  const imageName = imagePath.substr(imagePath.indexOf(".com/") + 5, imagePath.length);
  const s3 = new aws.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
    Bucket: 'mernimageuploader'
  });

  s3.deleteObject({
    Bucket: 'mernimageuploader',
    Key: imageName
  }, function (err, data) {
    if (err) console.log(err, err.stack);
    console.log(data)
  })
}

module.exports = awsFileDeletion;