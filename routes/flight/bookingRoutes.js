
const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/flight/bookingController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/api/books-flight/', authMiddleware,bookingController.getAllBookings);

router.get('/api/books-flight/:id', authMiddleware,bookingController.getBookingById);

router.post('/api/books-flight/', authMiddleware,bookingController.createBooking);

router.put('/api/books-flight/:id', authMiddleware,bookingController.updateBooking);

router.delete('/api/books-flight/:id', authMiddleware,bookingController.deleteBooking);

module.exports = router;