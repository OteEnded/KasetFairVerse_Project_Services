// entities/Reward_Claim_Logs.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Reward_Claim_Logs = connection.define('Reward_Claim_Logs', {
    reward_claim_order : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    coupon_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    staff: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
    },
});

module.exports = Reward_Claim_Logs;