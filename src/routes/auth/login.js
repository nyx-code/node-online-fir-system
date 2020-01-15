const express = require("express")
var jwt = require('jsonwebtoken');
const router = express.Router()

const {accountSID, authToken} = require("../../../config/").twilio
const serviceId = require("../../../config/").twilio.serviceId
const jwtSecret = require("../../../config/").jwtSecret

const client = require("twilio")(accountSID, authToken)

const User = require("../../models/User")

router.get('/', (req, res) => {   
    if (req.query.phoneNumber) {
        client.verify.services(serviceId)
        .verifications
        .create({to: `+${req.query.phoneNumber}`, channel: req.query.type && `${req.query.type}` === "call"  ? "call" : "sms"})
        .then(verification => {
            res.status(200).send({
                id: verification.sid,
                phoneNumber: req.query.phoneNumber,
                message: "Verification Code is sent!"
            })
        })
        .catch(error => {
            res.status(500).send(error.message)
        })
    } else {
        const message = "Please provide phone number."
        res.status(400).send(message)
    }
})

router.get('/verifyCode', (req, res) => {
    if(req.query.phoneNumber && req.query.code.length){
        client.verify.services(serviceId)
          .verificationChecks
          .create({to: `+${req.query.phoneNumber}`, code: `${req.query.code}`})
          .then(verification_check => {
              if (verification_check.status === "approved") {              
                User.findOne({phoneNumber: req.query.phoneNumber})
                .then((snapshot) => {
                    let body;
                    if (snapshot) {
                        const accessToken = jwt.sign({
                            id: snapshot._id
                        }, jwtSecret)

                        body = {
                            status: verification_check.status,
                            message: "Phone Number is Verified!",
                            ...snapshot._doc,
                            accessToken
                        }
                    } else {
                        body = {
                            status: verification_check.status,
                            message: "Phone Number is Verified!",
                        }
                    }
                    res.status(200).send(body)
                })
                .catch(error => {
                    res.status(500).send(error.message)
                })
              } else {
                res.status(200).send({
                    status: verification_check.status,
                    message: "Verification code is wrong."
                })
              }
          })
           .catch(error => {
                res.status(500).send(error.message)
           })
    } else {
        const message = "Phone number or Verification code is wrong."
        res.status(400).send(message)
    }
})

module.exports = router