// entities/Token_2_User_Buffer.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Token_2_User_Buffer = connection.define('Token_2_User_Buffer', {
    token: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    }
});

module.exports = Token_2_User_Buffer;