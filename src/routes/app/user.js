const express = require("express")
const pdf = require("html-pdf")

const User = require("../../models/User")
const isLoggedIn = require("../../middleware/")
const uuid = require("uuid/v4")
const generateDoc = require("../../controller/generateDoc")
const uploadFile = require("../../controller/uploadFile")

const router = express.Router()

router.post('/create-pdf', (req, res) => {
    pdf.create(generateDoc(req.body)).toBuffer((err,buffer) => {
      if(err) {
        res.status(500).send(err.message)
      }
        uploadFile({
            file: {
                buffer,
                originalname: "temp.pdf"
            }
        },res)
    });
})

module.exports = router