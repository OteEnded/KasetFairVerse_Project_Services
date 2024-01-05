// entities/Users.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Users = connection.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    }
});

module.exports = Users;
