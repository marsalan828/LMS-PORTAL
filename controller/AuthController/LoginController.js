const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const {sign} = require("jsonwebtoken");
require("dotenv").config();

const LoginController = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({message:"User not found, Please Sign Up"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({message:"Invalid Credentials"});
        }
        delete user.dataValues.password;
        
        const token = sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.cookie("auth", token, {
          httpOnly: true,
          maxAge: 3600 * 1000,
        });
        
        return res.status(200).json({
            message: "Login Successful",
            token,
            user: user,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Error loggin in",error:error.message})
    }
}

module.exports = LoginController;