const express = require("express");
const VehicleController = express.Router();
const Vehicle = require("../models/vehicle");
const Merchant = require("../models/merchant");
const { VerifyToken } = require("../middleware/verify_token");

VehicleController.get("/", VerifyToken, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({});
        res.status(200).json(vehicles);
    } catch (err) {
        console.log(err);
        res.status(500).json();
    }
});

VehicleController.post("/", VerifyToken, async (req, res) => {
    try {
        const vehicle = req.body;
        Vehicle.create(
            {
                ...vehicle,
            },
            (err, v) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: "Some error occurred. Please try again" });
                }

                res.status(200).json(v);
            }
        );
    } catch (e) {
        res.status(500).json();
    }
});
VehicleController.get("/merchant/:id", VerifyToken, async (req, res) => {
    // get all org visits
    try {
        const merchantId = req.params.id;
        const vehicles = await Vehicle.find({ merchantId: merchantId });
        res.status(200).json(vehicles);
    } catch (e) {
        res.status(500).json();
    }
});

module.exports = VehicleController;
