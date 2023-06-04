const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');

// Create a new reservation
router.post('/', reservationController.createReservation);

// Get all reservations
router.get('/', reservationController.getAllReservations);

// Get a single reservation
router.get('/:id', reservationController.getReservation);

// Update a reservation
router.put('/:id', reservationController.updateReservation);

// Delete a reservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
