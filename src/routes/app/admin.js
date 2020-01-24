const express = require("express")

const Fir = require("../../models/FIR")

const router = express.Router()

router.get('/allFIR', (req, res) => {
    Fir.find().populate("victimDetails.userId").then((snapshot) => {
        res.status(200).json(snapshot);
    })
    .catch(error => {
        res.status(500).json(error.message);
    })
})

module.exports = router
