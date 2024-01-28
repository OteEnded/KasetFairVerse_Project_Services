// entities/Reward_Stocks.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Reward_Stocks = connection.define('Reward_Stocks', {
    product: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    group_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    max_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    }
});

module.exports = Reward_Stocks;