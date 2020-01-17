const mongoose = require("mongoose")

const Schema = mongoose.Schema

const FirSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    crimeDetails: {
        district:{
            type: String,
            required: true,
        },
        policeStation: {
            type: String,
            required: true
        }
    },
    complaintDetails:{
        type: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        time: {
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            }
        },
        place: {
            type: String,
            required: true
        },
        suspectDetails: {
            type: String,
            required: true
        },
    },
    victimDetails: {
        userId: {
             type: Schema.Types.ObjectId,
             ref: "users"
        },
        guardianName: {
            type: String,
            required: true
        }
    },
    url: {
        type: String,
        required: true
    }
})

const Fir = mongoose.model('fir', FirSchema)

module.exports = Fir