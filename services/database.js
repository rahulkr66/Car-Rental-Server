const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config");

mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to mongo db");
    })
    .catch((err) => {
        console.log(err);
        console.log("Error connecting to mongo db");
    });