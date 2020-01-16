const mongoose = require("mongoose")

const Schema = mongoose.Schema

const FirSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    criminal: {
        type: String,
        required: true
    }
})

const Fir = mongoose.model('fir', FirSchema)

module.exports = Fir