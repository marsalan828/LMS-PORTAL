const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Course = require("./Course");

const Enrollment = sequelize.define(
  "Enrollments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: User,
          key: 'id',
      },
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
        references: {
            model: Course,
            key: 'id',
      }
    },
    enrollment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
  },

  // table name and createdat and updatedat
  {
    tableName: "enrolllments",
    timestamps: true,
  }
);

// // create table if not exist

// Enrollment.sync({
//   alter: true,
// }).then(() => {
//   console.log("Course table created/updated");
// });

module.exports = Enrollment;
