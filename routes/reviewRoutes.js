const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview);
router.get('/hotel/:hotelId', reviewController.getReviewsByHotel);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;