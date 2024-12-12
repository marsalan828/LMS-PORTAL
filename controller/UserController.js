const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(404).json({message:"User not found",error:error.message});
    }
}


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username, email, role, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message:"User you want to update is not found"});
        }
        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        return res
          .status(200)
          .json({ message: "User updated successfully", user: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Can not update user",error:error.message});
    }
}


