const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require('./User');

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: { msg: "Title can not be empty" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    },
  
    // table name and createdat and updatedat
  {
    tableName: "courses",
    timestamps: true,
  }
);

// // create table if not exist
// Course.sync({
//   alter: true,
// }).then(() => {
//   console.log("Course table created/updated");
// });

module.exports = Course;
