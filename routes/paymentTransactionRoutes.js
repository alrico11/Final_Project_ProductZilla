const express = require('express');
const router = express.Router();
const paymentTransactionController = require('../controllers/paymentTransactionController');

// Get all payment transactions
router.get('/', paymentTransactionController.getAllPaymentTransactions);

// Get payment transaction by id
router.get('/:id', paymentTransactionController.getPaymentTransactionById);

// Create a new payment transaction
router.post('/', paymentTransactionController.createPaymentTransaction);

// Update a payment transaction
router.put('/:id', paymentTransactionController.updatePaymentTransaction);

// Delete a payment transaction
router.delete('/:id', paymentTransactionController.deletePaymentTransaction);

module.exports = router;