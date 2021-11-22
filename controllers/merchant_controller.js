const express = require("express");
const MerchantController = express.Router();
const Merchant = require("../models/merchant");
const Vehicle = require("../models/vehicle");
const { VerifyToken } = require("../middleware/verify_token");

MerchantController.get("/", VerifyToken, async (req, res) => {
    try {
        const merchants = await Merchant.find({}, { password: 0 }) //exclude passwords
        res.status(200).json(merchants)
    }
    catch (e) {
        res.status(500).json()
    }
})

MerchantController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const merchantId = req.params.id;
        const merchant = await Merchant.findById(merchantId);

        res.status(200).json(merchant);
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
});

MerchantController.put("/:id", VerifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const merchant = await Merchant.findById(id);
        const updatedMerchant = req.body;

        if (!merchant) {
            res.status(404).json("Merchant not found!! Please try again");
        }

        await merchant.updateOne(updatedMerchant);
        res.status(200).json(merchant);
    } catch (e) {
        res.status(500).json();
    }
});

MerchantController.get("/vehicles/:id", VerifyToken, async (req, res) => {
    try {
        const merchantId = req.params.id;
        const merchantVehicles = await Vehicle.find({ merchantId: merchantId });
        res.status(200).json(merchantVehicles);
    } catch (e) {
        res.status(500).json();
    }
});

module.exports = MerchantController;