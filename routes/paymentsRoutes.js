const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.createPayment);
router.get('/:bookingId', paymentController.getPaymentsByBooking);
router.delete('/:paymentId', paymentController.deletePayment);

module.exports = router;