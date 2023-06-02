const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');

// Get all payment methods
router.get('/', paymentMethodController.getAllPaymentMethods);

// Get payment method by id
router.get('/:id', paymentMethodController.getPaymentMethodById);

// Create a new payment method
router.post('/', paymentMethodController.createPaymentMethod);

// Update a payment method
router.put('/:id', paymentMethodController.updatePaymentMethod);

// Delete a payment method
router.delete('/:id', paymentMethodController.deletePaymentMethod);

module.exports = router;