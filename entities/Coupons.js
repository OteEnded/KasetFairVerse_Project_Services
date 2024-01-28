// entities/Coupons.js
const { DataTypes } = require('sequelize');
const dbconnector = require('../services/dbconnector');
const connection = dbconnector.getConnection();
const { v4: uuidv4 } = require('uuid');
const qrCode = require('qrcode');

const Coupons = connection.define('Coupons', {
    coupon_uuid: {
        type: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    qr_code: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_redeemed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    hooks: {
        beforeCreate: async (coupon, options) => {
            // Generate a UUID and set it for coupon_uuid before creating the record
            console.log("Generating UUID for coupon_uuid")
            coupon.coupon_uuid = uuidv4();
            coupon.qr_code = await qrCode.toBuffer(coupon.coupon_uuid);
        },
    },
});

module.exports = Coupons;