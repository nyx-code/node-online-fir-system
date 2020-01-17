const express = require("express")
const pdf = require("html-pdf")

const Fir = require("../../models/FIR")
const User = require("../../models/User")
const isLoggedIn = require("../../middleware/")
const generateDoc = require("../../controller/generateDoc")
const uploadFile = require("../../controller/uploadFile")

const router = express.Router()

router.post('/:id/createFIR',isLoggedIn, (req, res) => {
    pdf.create(generateDoc("Nilesh Kadam", "12","34","123456789")).toBuffer((err,buffer) => {
        if(err) {
            res.status(500).send(err.message)
        }
      
        uploadFile({
            file: {
                buffer,
                originalname: "temp.pdf"
            }
        },res, true).then((value) => {

            let firData = {
                userId: req.params.id,
                url: value.Location,
                ...req.body,
            }

            firData.victimDetails.userId = req.params.id

            const fir = new Fir(firData)
            
            fir.save().then((data) => {
                User.findByIdAndUpdate(req.params.id,{
                    $push:{firList: data._id}
                }).then(() => {
                    res.status(200).json(data)
                }).catch(error => {
                    res.status(500).json(error.message)
                })
            })
            .catch(error => {
                res.status(500).send(error.message)
            })
        }).catch(error => {
            res.status(500).json(error.message)
        })
    });
    
})

module.exports = router