const express = require("express");
const CustomerController = express.Router();
const Customer = require("../models/customer");
const { VerifyToken } = require("../middleware/verify_token");

CustomerController.get("/:id", VerifyToken, async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId,{ password: 0 });
        res.status(200).json(customer);
    } catch (e) {
        res.status(500).json();
    }
});

CustomerController.put("/:id", VerifyToken, async (req, res) => {
    try{
        const id = req.params.id;
        const customer = await Customer.findById(id);
        const updatedCustomer = req.body;

        if(!customer){
            res.status(404).json("customer not found!! Please try again");
        }

        await customer.updateOne(updatedCustomer);
        res.status(200).json(customer);
    }catch(e){
        res.status(500).json();
    }
});

module.exports = CustomerController;