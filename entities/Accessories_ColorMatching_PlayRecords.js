// entities/Accessories_ColorMatching_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Accessories_ColorMatching_PlayRecords = connection.define('Accessories_ColorMatching_PlayRecords', {
    round_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    is_win: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    }
});

module.exports = Accessories_ColorMatching_PlayRecords;