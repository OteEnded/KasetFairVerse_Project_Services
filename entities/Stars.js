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
    from_game: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    }
});

module.exports = Stars;