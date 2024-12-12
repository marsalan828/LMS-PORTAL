const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// // create table if not exist

// User.sync({
//   alter: true,
// }).then(() => {
//   console.log("user table created/updated");
// });

module.exports = User;
