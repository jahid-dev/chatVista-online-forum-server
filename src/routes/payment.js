const express = require('express');
const verifyToken = require("../middlewares/verifyToken");
const { savePayment, createPayment } = require('../controllers/paymentController');
const router = express.Router();


router.post('/payments', verifyToken,savePayment)
router.post('/create-payment-intent', verifyToken,createPayment)

module.exports = router;