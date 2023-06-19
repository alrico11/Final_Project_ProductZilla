const express = require('express');
const router = express.Router();
// const HotelRooms = require('../../models/hotel/hotel');
// const Payment = require('../../models/hotel/payment');
const authMiddleware = require('../../middleware/authMiddleware');
const auth = require('../../middleware/onlyAdmin')

const paymentController = require('../../controllers/hotel/paymentController');
router.post('/api/payment/', authMiddleware,paymentController.createPayment);
router.get('/api/payment/:id', authMiddleware,paymentController.getPaymentById);
router.get('/api/payment/', authMiddleware,paymentController.getAllPayments);
router.put('/api/payment/:id', authMiddleware,paymentController.updatePayment);
router.delete('/api/payment/:id', authMiddleware,paymentController.deletePayment);

router.post('/api/confirm-payment/', auth,paymentController.confirmPayment);
module.exports = router;