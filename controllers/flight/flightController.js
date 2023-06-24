const Flight = require('../../models/flight/flight');

// create flight
exports.createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    // Return the saved flight object with populated fields
    //const savedFlight = await Flight.findById(flight._id).populate('departure.departure_airport').populate('arrival.arrival_airport');
    const savedFlight = await Flight.findById(flight._id)
      .populate({
        path: 'departure.departure_airport',
        select: 'name city country'
      })
      .populate({
        path: 'arrival.arrival_airport',
        select: 'name city country'
      })
      .lean();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get flights by city
exports.findFlightsByCities = async (req, res) => {
  const { departureCity, arrivalCity } = req.body;

  try {
    const flights = await Flight.find({
      'departure.departure_city': departureCity,
      'arrival.arrival_city': arrivalCity
    });
    res.status(200).json({ flights });
  } catch (err) {

    res.status(500).json({ message: 'Internal server error' });
  }
};

// get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().populate('departure.departure_airport').populate('arrival.arrival_airport');
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single flight
exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id).populate('departure.departure_airport').populate('arrival.arrival_airport');
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update flight

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('departure.departure_airport').populate('arrival.arrival_airport');
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete flight
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    await flight.deleteOne();
    res.json({ message: 'Flight deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};