// entities/Hemp_TheDrink_PlayRecords.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();

const ending_list = ["Chocolate", "Coffee", "Plain", "Skim", "Strawberry", "Sweet"];

const Hemp_TheDrink_PlayRecords = connection.define('Hemp_TheDrink_PlayRecords', {
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
    ending: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
            isIn: {
                args: [ending_list],
                msg: "Ending must be one of the preset values. (Contact API team for more information)",
            }
        }
    }
});

module.exports = Hemp_TheDrink_PlayRecords;