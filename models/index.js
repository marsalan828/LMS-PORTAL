// This is the file defining many to many relationship between user and coure tables
const sequelize = require("../config/db");
const Course = require("./Course");
const Enrollment = require("./Enrollments");
const User = require("./User");

// one to many
User.hasMany(Course, { foreignKey: "created_by" });
Course.belongsTo(User, { foreignKey: "created_by" });

// many to many between course and use through enrollment table
User.belongsToMany(Course, { through: Enrollment, foreignKey: "user_id" });
Course.belongsToMany(User, { through: Enrollment, foreignKey: "course_id" });


async function connCheck() {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ force: false });

    } catch (error) {
        console.log("error message : ",error);
    }
}

connCheck();
module.exports = { User, Course, Enrollment };
