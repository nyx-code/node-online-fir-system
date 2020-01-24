const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const multer = require("multer")

const uploadFile = require("./src/controller/uploadFile")
const mongoURL = require("./config").mongoURL
const app = express()
const port = process.env.PORT || 3000

const login = require("./src/routes/auth/login")
const createUser = require("./src/routes/auth/createUser")
const user = require("./src/routes/app/user")
const admin = require("./src/routes/app/admin")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

mongoose.connect(mongoURL, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
    .then(()=> console.log("Database Connected!"))
    .catch((error) => console.log(`ERROR: ${error.message}`))


const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});

const upload = multer({ storage: storage }).single('file');
    

app.get('/', (req,res) => {
    const body = {
        message: "You are on Homepage. Documentation will be here soon!"
    }
    res.send(body)
})

app.post('/upload', upload, uploadFile)

app.use('/login', login)
app.use('/createUser', createUser)
app.use('/user', user)
app.use('/admin', admin)

app.listen(port, () => {
    console.log(`Server is up at port: ${port}`)
})
