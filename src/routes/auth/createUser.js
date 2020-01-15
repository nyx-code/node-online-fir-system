const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const jwtSecret = require("../../../config/").jwtSecret
const router = express.Router()

router.post('/', (req, res) => {
    User.findOne({phoneNumber: `${req.body.phoneNumber}`})
        .then((snapshot) => {
            if (snapshot) {
                const message = "User already exist with given number."
                res.status(400).send(message)
            } else {
                const user = new User({
                    ...req.body
                }) 

                user.save()
                    .then(data => {
                        const accessToken = jwt.sign({
                            id: data._id
                        }, jwtSecret)

                        const body = {
                            accessToken,
                            ...data._doc
                        }
                        res.status(200).json(body)
                    })
                    .catch(error => {
                        res.status(500).send(error.message)
                    })
            }
        })
        .catch((error) => {
            res.status(500).send(error.message)
        })
})

module.exports = router