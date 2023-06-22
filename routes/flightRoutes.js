const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// Create a new flight
router.post('/flights', flightController.createFlight);

// Get all flights
router.get('/flights', flightController.getAllFlights);

// Get a single flight by ID
router.get('/flights/:id', flightController.getFlightById);

// Update a flight by ID
router.put('/flights/:id', flightController.updateFlightById);

// Delete a flight by ID
router.delete('/flights/:id', flightController.deleteFlightById);

module.exports = router;
