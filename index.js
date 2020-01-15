const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const multer = require("multer")
const AWS = require('aws-sdk');
const uuid = require("uuid/v4")

const {awsID, awsSecret, awsS3BucketName} = require("./config/").aws

const mongoURL = require("./config").mongoURL
const app = express()
const port = 3000

const login = require("./src/routes/auth/login")
const createUser = require("./src/routes/auth/createUser")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(mongoURL, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
    .then(()=> console.log("Database Connected!"))
    .catch((error) => console.log(`ERROR: ${error.message}`))


const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});

const upload = multer({ storage: storage }).single('image');

const s3 = new AWS.S3({
    accessKeyId: awsID,
    secretAccessKey: awsSecret
});
    

app.get('/', (req,res) => {
    const body = {
        message: "You are on Homepage. Documentation will be here soon!"
    }
    res.send(body)
})

app.post('/upload', upload, (req,res) => {
    let myImage = req.file.originalname.split(".")
    const imageType = myImage[myImage.length - 1]

    const params = {
       Bucket: awsS3BucketName,
       Key: `${uuid()}.${imageType}`,
       Body: req.file.buffer
    };

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }else{
            res.status(200).json(data)
        }
    });
})

app.use('/login', login)
app.use('/createUser', createUser)

app.listen(port, () => {
    console.log(`Server is up at port: ${port}`)
})