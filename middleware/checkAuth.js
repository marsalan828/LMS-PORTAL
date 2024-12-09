require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token" });
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" });
    }
}

module.exports = checkAuth;