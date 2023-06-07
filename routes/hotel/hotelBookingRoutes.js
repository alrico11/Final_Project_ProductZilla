
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const bookingController = require('../../controllers/hotel/hotelBookingController');

router.post('/api/book/', authMiddleware,bookingController.bookRoom);
router.get('/api/book/:id', authMiddleware,bookingController.getBookingById);
router.get('/api/book/', authMiddleware,bookingController.getAllBookings);
router.put('/api/book/:id', authMiddleware,bookingController.updateBooking);
router.delete('/api/book/:id', authMiddleware,bookingController.cancelBooking);

module.exports = router;