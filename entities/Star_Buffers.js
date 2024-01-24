// entities/Star_Buffers.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const Star_Buffers = connection.define('Star_Buffers', {
    star_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    from_game: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    sent_to_bbt: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
    }
});

module.exports = Star_Buffers;