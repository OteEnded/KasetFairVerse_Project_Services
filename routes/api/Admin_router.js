const express = require('express');
const router = express.Router();
const apiMiddleware = require('../../services/apimiddleware');
const dbmigrateandseed = require('../../services/dbmigrateandseed');

const qrCode = require('qrcode');

const star = require('../../models/Star');
const coupon = require('../../models/Coupon');
const coupons = require('../../entities/Coupons');
const User = require('../../models/User');

// GET /api/Admin/migrate
router.post('/migrate', apiMiddleware.authenticate, async (req, res) => {
    try {
        await dbmigrateandseed.migrate();
        res.json({
            is_success: true,
            message: "Migrate",
            status: 200,
            content: {
                message: "Migrate function invoked"
            }
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// GET /api/Admin/seed
router.post('/seed', apiMiddleware.authenticate, async (req, res) => {
    try {
        await dbmigrateandseed.seed();
        res.json({
            is_success: true,
            message: "Seed",
            status: 200,
            content: {
                message: "Seed function invoked"
            }
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// POST /api/Admin/star_up/user_id/:user_id
router.post('/star_up/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        let starUpReq = {
            user_id: parseInt(req.params.user_id),
            source: req.body.source
        }
        await star.starUp(starUpReq);
        res.json({
            message: "done"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// POST /api/Admin/get_star_inv/user_id/:user_id
router.post('/get_star_inv/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        let star_inv = await star.getStarInventoryByUserId(parseInt(req.params.user_id));
        res.json({
            message: "done",
            content: star_inv
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// POST /api/Admin/coupon_up/user_id/:user_id
router.post('/coupon_up/user_id/:user_id', apiMiddleware.authenticate, async (req, res) => {
    try {
        a = await coupon.createCoupon({
            user_id: parseInt(req.params.user_id),
            reward: req.body.reward
        });
        console.log(a);
        res.json({
            message: "done"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            is_success: false,
            message: "Error",
            status: 500,
            content: {
                error: error.message
            }
        });
    }
});

// POST /api/Admin/save_qr_code
router.post('/save_qr_code', apiMiddleware.authenticate, async (req, res) => {
    try {
        let qrCodeData = await coupon.getAllCoupons();
        qrCodeData = qrCodeData[0].coupon_uuid;

        // Generate QR code as buffer
        const qrCodeBuffer = await qrCode.toBuffer(qrCodeData);

        await coupons.update({
            qr_code: qrCodeBuffer
        },
        {
            where: {
                coupon_uuid: qrCodeData
            }
        });

        res.send('QR code saved to the database');
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST /api/Admin/get_qr_code
router.post('/get_qr_code', apiMiddleware.authenticate, async (req, res) => {
    try {
        // Fetch the latest QR code from the database
        const qrCodeData = await coupons.findOne({
            order: [['createdAt', 'DESC']], // Get the latest one
        });

        if (qrCodeData) {
            // Convert Buffer to data URI
            const dataURI = `data:image/png;base64,${qrCodeData.qr_code.toString('base64')}`;

            // Display the QR code in an HTML image tag
            res.send(`<img src="${dataURI}" alt="QR Code">`);
        }
        else {
            res.send('No QR code found in the database');
        }
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/ln', apiMiddleware.authenticate, async (req, res) => {
    try {
        const result = await User.userLogin(req.body.username, req.body.password);

        console.log(result);

        res.send(result);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;