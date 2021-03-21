const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { IAM_S3 } = require('../../config/awsconfig');
const path = require('path');

const s3 = new AWS.S3(IAM_S3);

const s3_upload = multer({
    storage: multerS3({
        s3,
        bucket: 'kiwi-uploader',
        key: (_, file, cb) => {
            const extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        acl: 'public-read',
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
}).array('files', 3);

module.exports = { s3_upload };
