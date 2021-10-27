const express = require("express");
const AuthController = express.Router();
const bcrypt = require("bcryptjs");
const { generateToken } = require("../services/authentication");
const Merchant = require("../models/merchant");
const Customer = require("../models/customer");

AuthController.post("/merchant/register", (req, res) => {
    const merchantName = req.body.merchantName;
    const merchantEmail = req.body.merchantEmail;
    const password = req.body.password;
    const merchantAddress = req.body.merchantAddress;
    const merchantContact = req.body.merchantContact;

    const hashedPassword = bcrypt.hashSync(password, 8);

    Merchant.create(
        {
            merchantName: merchantName,
            merchantEmail: merchantEmail,
            password: hashedPassword,
            merchantAddress: merchantAddress,
            merchantContact: merchantContact,
        },
        (err, merchant) => {
            if (err) {
                const message =
                    err.code === 11000
                        ? "Email already in use"
                        : "Some error occurred. Please try again";
                return res.status(500).json({
                    auth: false,
                    message: message,
                });
            }

            const token = generateToken(merchant._id);
            res.status(200).json({
                auth: true,
                token: token,
                merchantId: merchant._id,
                merchantName: merchant.merchantName,
                merchantEmail: merchant.merchantEmail,
                merchantAddress: merchant.merchantAddress,
                merchantContact: merchant.merchantContact,
                message: "Registration successful",
            });
        }
    );
});

AuthController.post("/merchant/login", async (req, res) => {
    const merchantEmail = req.body.merchantEmail;
    const password = req.body.password;

    try {
        const merchant = await Merchant.findOne({
            merchantEmail: merchantEmail,
        });

        if (!merchant) {
            console.log("No merchant found for email");
            return res.status(404).json({ auth: false, message: "No customer found" });
        }

        const checkPassword = bcrypt.compareSync(password, merchant.password);
        if (!checkPassword) {
            console.log("Invalid password");
            return res
                .status(401)
                .json({ auth: false, token: null, message: "Invalid password" });
        }

        const token = generateToken(merchant._id);
        console.log(merchant.name);
        res.status(200).json({
            auth: true,
            token: token,
            merchantId: merchant._id,
            merchantName: merchant.merchantName,
            merchantEmail: merchant.merchantEmail,
            merchantAddress: merchant.merchantAddress,
            merchantContact: merchant.merchantContact,
            message: "Login successful",
        });
    } catch (e) {
        if (e) {
            console.log("Error while logging in customer");
            console.log(e);
            return res.status(500).json({
                auth: false,
                message: "Some error occurred. Please try again",
            });
        }
    }
});



AuthController.post("/customer/register", async (req, res) => {
    const customerName = req.body.customerName;
    const customerEmail = req.body.customerEmail;
    const password = req.body.password;
    const customerContact = req.body.customerContact;

    const hashedPassword = bcrypt.hashSync(password, 8);
    Customer.create(
        {
            customerName: customerName,
            customerEmail: customerEmail,
            password: hashedPassword,
            customerContact: customerContact,
        },
        (e, customer) => {
            if (e) {
                const message =
                    e.code == 11000 ? "customer already registered" : "Try again later";
                return res.status(500).json({
                    auth: false,
                    message: message,
                });
            }
            const token = generateToken(customer._id);
            res.status(200).json({
                auth: true,
                token: token,
                customerId: customer._id,
                customerName: customer.customerName,
                customerEmail: customer.customerEmail,
                customerContact: customer.customerContact,
                message: "Registration success",
            });
        }
    );
});

AuthController.post("/customer/login", async (req, res) => {
    const customerEmail = req.body.customerEmail;
    const password = req.body.password;
    try {
        const customer = await Customer.findOne({ customerEmail: customerEmail });
        console.log(customer);
        if (!customer) {
            console.error("No customer found");
            return res.status(404).json({
                auth: false,
                message: "customer not found",
            });
        }
        const checkPassword = bcrypt.compareSync(password, customer.password);
        console.log(checkPassword);
        if (!checkPassword) {
            console.error("Invalid password");
            return res
                .status(401)
                .json({ auth: false, token: null, message: "Invalid password" });
        }
        const token = generateToken(customer._id);
        res.status(200).json({
            auth: true,
            token: token,
            customerId: customer._id,
            customerName: customer.customerName,
            customerEmail: customer.customerEmail,
            customerContact: customer.customerContact,
            message: "Login successful",
        });
    } catch (e) {
        if (e) {
            console.error("Login error " + e);
            return res.status(500).json({
                auth: false,
                token: null,
                message: "Login failed. Try again!",
            });
        }
    }
});

module.exports = AuthController;
