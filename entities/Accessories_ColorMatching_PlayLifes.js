// entities/Accessories_ColorMatching_PlayLifes.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Accessories_ColorMatching_PlayLifes = connection.define('Accessories_ColorMatching_PlayLifes', {
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
        defaultValue: 10,
    },
    color_matching: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 5,
    }
});

module.exports = Accessories_ColorMatching_PlayLifes;