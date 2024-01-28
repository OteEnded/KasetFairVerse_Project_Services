// entities/Star_Trading_Policies.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Star_Trading_Policies = connection.define('Star_Trading_Policies', {
    product: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    star_use_to_claim: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    }
});

module.exports = Star_Trading_Policies;