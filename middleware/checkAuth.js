require("dotenv").config();
const { verify } = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token" });
    }
    try {
            const decode = verify(token, process.env.SECRET_KEY);
            req.user = decode;
            next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid Token" });
    }
}

module.exports = checkAuth;