const express = require('express')
const cors = require('cors')
const db = require('./services/database')
const CustomerController = require('./controllers/customer_controller')
const MerchantController = require('./controllers/merchant_controller')
const VehicleController = require('./controllers/vehicle_controller')
const BookingController = require('./controllers/booking_controller')
const AuthController = require('./controllers/auth_controller')

const app = express()

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
    extended: true
}))

app.get("/api", (req, res) => {
    res.send("Hello world!")
})

app.use("/api/auth", AuthController);
app.use("/api/merchant", MerchantController);
app.use("/api/customer", CustomerController);
app.use("/api/vehicles", VehicleController);
app.use("/api/booking",BookingController)

module.exports = app 