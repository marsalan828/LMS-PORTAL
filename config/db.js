require('dotenv').config();
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging:false,
});

// test connection
async function testConn() {
    try {
        await sequelize.authenticate();
        console.log("connection successfull");
    } catch (err) {
        console.error("connection unsuccessful", err);
    }
    sequelize.close();
}

// testConn();
module.exports = sequelize;