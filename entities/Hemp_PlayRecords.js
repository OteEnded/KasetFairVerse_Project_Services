// entities/Hemp_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Hemp_PlayRecords = connection.define('Hemp_PlayRecords', {
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
    ending: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
});

module.exports = Hemp_PlayRecords;