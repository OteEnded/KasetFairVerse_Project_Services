// entities/KubKaoKabKang_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

// RequestLogs
// {PK} [int] request_id #autoincrement
// [String] requester_ip (req.ip)
// [String] request_to (req.hostname + req.originalUrl)
// [String] request_method (req.method)
// [Text] request_header (req.header)
// [Text] request_body (req.body)

const RequestLogs = connection.define('RequestLogs', {
    request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    requester_ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    request_to: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    request_protocol: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    request_method: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    request_header: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    request_body: {
        type: DataTypes.JSON,
        allowNull: true,
    }
});

module.exports = RequestLogs;
