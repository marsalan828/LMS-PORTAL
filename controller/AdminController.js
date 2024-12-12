const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { firstname, lastname, username, email, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      role,
      password: hashedPassword,
    });
    delete newUser.dataValues.password;
    return res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "User not created", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const delUser = await User.findByPk(id);
    if (!delUser) {
      return res.status(404).json({ message: "User can not be found" });
    }
    await delUser.destroy();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User can not be deleted", error: error.message });
  }
};