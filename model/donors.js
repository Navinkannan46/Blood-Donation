const mongoose = require("mongoose")

const donorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    diseases: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },

})

const donorsModel = mongoose.model("donors", donorsSchema)
module.exports = donorsModel
