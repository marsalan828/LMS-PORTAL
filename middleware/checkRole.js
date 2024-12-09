module.exports = function(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            return res.status(403).json({message: "You are not allowed to do this!!!"})
        }
    }
}