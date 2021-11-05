const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    merchantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    vehicleModel: {
        type: String,
        required:true,
    },
    vehicleRegistration: {
        type: String,
        required:true,
    },
    bookingCost: {
        type: Number,
        required: true,
    },
    bookingStartDate: {
        type: Date,
        required: true,
    },
    bookingEndDate: {
        type: Date,
        required: true,
    }
})

mongoose.model('Booking', BookingSchema)
module.exports = mongoose.model('Booking')