module.exports = function(role) {
    return (req, res, next) => {
        console.log(req.user.role)
        if (req.user.role === role) {
            next();
        } else {
            return res.status(403).json({message: "You are not allowed to do this!!!"})
        }
    }
}