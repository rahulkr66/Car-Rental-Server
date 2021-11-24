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

VehicleController.post("/booked/:id", VerifyToken, async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json();
        }
        await vehicle.updateOne(req.body);
        res.status(200).json();
    } catch (e) {
        res.status(500).json();
    }
});

VehicleController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        console.log(vehicle);
        if (!vehicle) return res.status(404).json();

        res.status(200).json(vehicle);
    } catch (e) {
        res.status(500).json();
    }
});

VehicleController.delete("/:id", VerifyToken, async (req, res) => {
    try {
        await Vehicle.deleteOne({ _id: req.params.id });
        res.status(200).json();
    } catch (e) {
        res.status(500).json();
    }
});

module.exports = VehicleController;
