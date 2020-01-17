const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: Number,
        required: true
    },
    aadharFrontImage: {
        type: String,
        required: true
    },
    aadharBackImage: {
        type: String,
        required: true
    },
    firList: [{
        type: Schema.Types.ObjectId,
        ref: 'fir'
    }]
})

const User = mongoose.model('users', UserSchema)

module.exports = User