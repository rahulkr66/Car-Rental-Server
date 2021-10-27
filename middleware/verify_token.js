const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const VerifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        console.log("no token provided");
        return res
            .status(401)
            .send({ auth: false, message: "No token provided. Forbidden request" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res
                .status(500)
                .send({ auth: false, message: "Failed to authenticate token." });
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = { VerifyToken };