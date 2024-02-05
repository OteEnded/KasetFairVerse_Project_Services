// entities/Cosmetic_HoldYourBasket_PlayLifes.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Cosmetic_HoldYourBasket_PlayLifes = connection.define('Cosmetic_HoldYourBasket_PlayLifes', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    spin_wheel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 5,
    },
    hold_your_basket: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 2,
    }
});

module.exports = Cosmetic_HoldYourBasket_PlayLifes;