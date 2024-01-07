// entities/KubKaoKabKang_PasteScrumble_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const KubKaoKabKang_PasteScrumble_PlayRecords = connection.define('KubKaoKabKang_PasteScrumble_PlayRecords', {
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
    score: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        unique: false,
    }
});

module.exports = KubKaoKabKang_PasteScrumble_PlayRecords;
