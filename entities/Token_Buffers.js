// entities/Token_Buffers.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Token_Buffer = connection.define('Token_Buffers', {
    bbt_token: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    }
});

module.exports = Token_Buffer;