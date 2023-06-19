const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/flight/paymentController');
const authMiddleware = require('../../middleware/authMiddleware');
const isAdmin = require('../../middleware/isAdmin');
// Get all payments
router.get('/api/payment-flight/', authMiddleware,paymentController.getAllPayments);

// Get a single payment by id
router.get('/api/payment-flight/:id', authMiddleware,paymentController.getPaymentById);

// Create a new payment
router.post('/api/payment-flight/', authMiddleware,paymentController.createPayment);

// Delete a payment
router.delete('/api/payment-flight/:id', authMiddleware,paymentController.deletePayment);

//Confirm Payment to Paid
// router.post('/api/payment-flight-confirm/', authMiddleware,paymentController.confirmPayment);

// Update an existing payment
router.put('/api/payment-flight/:id', isAdmin,paymentController.updatePayment);



module.exports = router;

