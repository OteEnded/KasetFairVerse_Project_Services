// entities/BigBangTheory_User_Profiles.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const BigBangTheory_User_Profiles = connection.define('BigBangTheory_User_Profiles', {
    bbt_user_uuid: {
        type: DataTypes.STRING,
        allowNull: true,
        primaryKey: true,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    bbt_user_id: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    image_profile: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
        unique: false,
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    location_base: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
    },
});

module.exports = BigBangTheory_User_Profiles;