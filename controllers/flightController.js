const Flight = require('../models/flight');

exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        res.status(200).json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createFlight = async (req, res) => {
    const flight = new Flight({
        airline: req.body.airline,
        flightNumber: req.body.flightNumber,
        origin: req.body.origin,
        destination: req.body.destination,
        departureTime: req.body.departureTime,
        arrivalTime: req.body.arrivalTime,
        price: req.body.price,
        availableSeats: req.body.availableSeats
    });

    try {
        const newFlight = await flight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateFlight = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        flight.airline = req.body.airline;
        flight.flightNumber = req.body.flightNumber;
        flight.origin = req.body.origin;
        flight.destination = req.body.destination;
        flight.departureTime = req.body.departureTime;
        flight.arrivalTime = req.body.arrivalTime;
        flight.price = req.body.price;
        flight.availableSeats = req.body.availableSeats;

        const updatedFlight = await flight.save();
        res.status(200).json(updatedFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        await flight.remove();
        res.status(200).json({ message: 'Flight deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};