require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;

module.exports = {
    PORT,
    MONGODB_URI,
    SECRET,
    STRIPE_API_KEY
};