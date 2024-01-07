// entities/KubKaoKabKang_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const KubKaoKabKang_PlayRecords = connection.define('KubKaoKabKang_PlayRecords', {
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
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  }
});

module.exports = KubKaoKabKang_PlayRecords;
