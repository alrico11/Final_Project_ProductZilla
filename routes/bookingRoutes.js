const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

// Create a new flight
router.post("/", flightController.createFlight);

// Get all flights
router.get("/", flightController.getAllFlights);

// Get a single flight by id
router.get("/:id", flightController.getFlightById);

// Update a flight by id
router.put("/:id", flightController.updateFlightById);

// Delete a flight by id
router.delete("/:id", flightController.deleteFlightById);

module.exports = router;
