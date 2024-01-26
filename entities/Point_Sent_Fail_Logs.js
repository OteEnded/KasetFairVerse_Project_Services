// entities/Point_Sent_Fail_Logs.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Point_Sent_Fail_Logs = connection.define('Point_Sent_Fail_Logs', {
    point_sent_fail_logs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    star_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    respond: {
        type: DataTypes.JSON,
        allowNull: true,
        unique: false,
    }
});

module.exports = Point_Sent_Fail_Logs;