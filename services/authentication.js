const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const generateToken = (id) => {
    const token = jwt.sign({ id: id }, SECRET, {
        expiresIn: "1000h"
    });
    
    return token;
}

module.exports = { generateToken };