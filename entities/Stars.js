// entities/Stars.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const game_list = [
    "Accessories/ColorMatching",
    "CoffeeBean/FindMyMeow",
    "CornMilk/RaisuwanCrush",
    "Cosmetic/HoldYourBasket",
    "Hemp/TheDrink",
    "KubKaoKabGang/CWheat",
    "KubKaoKabGang/PasteScrumble"
];

const Stars = connection.define('Star', {
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
    source: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false,
    },
    coupon_uuid: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        unique: false,
    }
});

module.exports = Stars;