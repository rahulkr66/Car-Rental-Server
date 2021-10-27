const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
    merchantName: {
        type: String,
        required: true
    },
    merchantEmail: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    merchantAddress: { 
        type: String,
        required: true
    },
    merchantContact: { 
        type: String,
        required: true,
        index: { unique: true }
    }
});

mongoose.model("Merchant", MerchantSchema);
module.exports = mongoose.model("Merchant");