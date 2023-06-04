const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
try {
const { payment, reservationDate, reservationCode } = req.body;

const newReservation = new Reservation({
  payment,
  reservationDate,
  reservationCode,
});

const savedReservation = await newReservation.save();

res.status(201).json(savedReservation);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.getAllReservations = async (req, res) => {
try {
const reservations = await Reservation.find();

res.status(200).json(reservations);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.getReservationById = async (req, res) => {
try {
const reservation = await Reservation.findById(req.params.id);

if (!reservation) {
  res.status(404).json({ message: 'Reservation not found' });
}

res.status(200).json(reservation);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.updateReservation = async (req, res) => {
try {
const { payment, reservationDate, reservationCode } = req.body;

const updatedReservation = await Reservation.findByIdAndUpdate(
  req.params.id,
  {
    payment,
    reservationDate,
    reservationCode,
  },
  { new: true }
);

if (!updatedReservation) {
  res.status(404).json({ message: 'Reservation not found' });
}

res.status(200).json(updatedReservation);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.deleteReservation = async (req, res) => {
try {
const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

if (!deletedReservation) {
  res.status(404).json({ message: 'Reservation not found' });
}

res.status(200).json({ message: 'Reservation deleted successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};