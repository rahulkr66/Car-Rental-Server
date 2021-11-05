const express = require('express')
const BookingController = express.Router()
const Booking = require("../models/booking");
const { VerifyToken } = require("../middleware/verify_token");
const mongoose = require("mongoose");

BookingController.post('/', VerifyToken, async (req, res) => {
    try {
        const booking = req.body;
        console.log(booking);
        Booking.create({
            ...booking
        },
            (err, b) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Some error occurred. Please try again" })
                }

                res.status(200).json(booking);
            }
        );
    } catch (e) {
        res.status(500).json();
    }
});

BookingController.get("/customer/:id", VerifyToken, async (req, res) => {
    try {
        const bookings = await Booking.find({ customerId: req.params.id });
        res.status(200).json(bookings);
    } catch (e) {
        res.status(500).json();
    }
});

BookingController.put("/:id", VerifyToken, async (req, res) => {
    try {
        const updatedBooking = req.body;
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: "No booking found. Please try again" });

        await booking.updateOne(updatedBooking);
        res.status(200).json(booking);
    } catch (e) {
        res.status(500).json();
    }
});

BookingController.delete("/:id", VerifyToken, async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        await Booking.deleteOne(id);
        res.status(200).json();
    } catch (e) {
        console.log(e);
        res.status(500).json();
    }
});

module.exports = BookingController