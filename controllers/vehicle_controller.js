const express = require('express')
const VehicleController = express.Router()
const Vehicle = require('../models/vehicle')
const Merchant = require('../models/merchant')
const { VerifyToken } = require('../middleware/verify_token')

VehicleController.get('/', VerifyToken, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({})
        res.status(200).json(vehicles)
    } catch (err) {
        console.log(err)
        res.status(500).json()
    }
})

module.exports = VehicleController