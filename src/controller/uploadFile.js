const AWS = require('aws-sdk');
const uuid = require("uuid/v4")

const {awsID, awsSecret, awsS3BucketName} = require("../../config/").aws

const s3 = new AWS.S3({
    accessKeyId: awsID,
    secretAccessKey: awsSecret
});


const uploadFile = (req,res) => {
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
       Bucket: awsS3BucketName,
       Key: `${uuid()}.${fileType}`,
       Body: req.file.buffer
    };

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }else{
            res.status(200).json(data)
        }
    });
}

module.exports = uploadFile