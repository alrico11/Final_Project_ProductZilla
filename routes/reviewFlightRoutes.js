const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewFlightController');

// Create a new review
router.post('/', reviewController.createReview);

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get a single review
router.get('/:id', reviewController.getReview);

// Update a review
router.patch('/:id', reviewController.updateReview);

// Delete a review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
