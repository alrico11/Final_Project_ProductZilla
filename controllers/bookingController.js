const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
try {
const { user, room, checkInDate, checkOutDate, totalPrice, paymentMethod } = req.body;
const newBooking = new Booking({
user,
room,
checkInDate,
checkOutDate,
totalPrice,
paymentMethod,
});
const savedBooking = await newBooking.save();
res.status(201).json(savedBooking);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
};

exports.getBookingsByUser = async (req, res) => {
try {
const { userId } = req.params;
const bookings = await Booking.find({ user: userId }).populate('room').exec();
res.status(200).json(bookings);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
};

exports.deleteBooking = async (req, res) => {
try {
const { bookingId } = req.params;
await Booking.findByIdAndDelete(bookingId);
res.status(200).json({ message: 'Booking deleted successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
};