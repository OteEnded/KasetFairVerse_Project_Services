// entities/CoffeeBean_FindMyMeow_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const CoffeeBean_FindMyMeow_PlayRecords = connection.define('CoffeeBean_FindMyMeow_PlayReocords', {
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
    normal_cat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    golden_cat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
});

module.exports = CoffeeBean_FindMyMeow_PlayRecords;
