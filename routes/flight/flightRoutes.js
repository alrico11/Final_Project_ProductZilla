
const express = require('express');
const router = express.Router();
const flightController = require('../../controllers/flight/flightController');
const authMiddleware = require('../../middleware/authMiddleware');
const isAdmin = require('../../middleware/isAdmin');

router.get('/api/flight/', authMiddleware,flightController.getAllFlights);

router.get('/api/flight/:id', authMiddleware,flightController.getFlight);

router.post('/api/flight/search', authMiddleware,flightController.findFlightsByCities);

router.post('/api/flight/', isAdmin,flightController.createFlight);

router.put('/api/flight/:id', isAdmin,flightController.updateFlight);

router.delete('/api/flight/:id', isAdmin,flightController.deleteFlight);

module.exports = router;