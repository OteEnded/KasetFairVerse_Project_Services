// entities/Cosmetic_HoldYourBasket_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Cosmetic_HoldYourBasket_PlayRecords = connection.define('Cosmetic_HoldYourBasket_PlayRecords', {
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
    score: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
    }
});

module.exports = Cosmetic_HoldYourBasket_PlayRecords;
