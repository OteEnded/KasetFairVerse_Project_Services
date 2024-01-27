// entities/Stars_Usages.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Stars_Usages = connection.define('Stars_Usages', {
    star_usage_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    coupon_uuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: false,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    }
});

module.exports = Stars_Usages;