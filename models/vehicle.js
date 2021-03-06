const mongoose = require("mongoose")

const VehicleSchema = new mongoose.Schema({
    merchantId: {
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
    vehicleRentRate: {
        type: Number,
        required:true,
    },
    vehicleImage: {
        type: String,
    },
    isBooked: {
        type: Boolean,
        default: false,
    }
})

mongoose.model("Vehicle", VehicleSchema)
module.exports = mongoose.model("Vehicle")