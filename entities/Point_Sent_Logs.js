// entities/Point_Sent_Logs.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Point_Sent_Logs = connection.define('Point_Sent_Logs', {
    bbt_point_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    star_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    bbt_user_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    point_slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
    }
});

module.exports = Point_Sent_Logs;