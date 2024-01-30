// entities/Point_Send_Logs.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

// Point_Send_Logs
// {PK} [int] point_send_id #autoincrement
// {PK} {FK: Star.star_id}
// [JSON] respond_data #nullable
// [JSON] respond_errors #nullable
// #autotimestamp

const Point_Send_Logs = connection.define('Point_Send_Logs', {
    point_send_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
    },
    star_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    respond_data: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    respond_errors: {
        type: DataTypes.JSON,
        allowNull: true,
    }
});

module.exports = Point_Send_Logs;
