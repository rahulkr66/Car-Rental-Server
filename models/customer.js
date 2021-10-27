const mongoose = require("mongoose")


const CustomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    customerContact: { 
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Customer", CustomerSchema)