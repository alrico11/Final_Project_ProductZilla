const HotelBooking = require('../../models/hotel/booking');

const hotelBookingController = {
    getAllBookings: async (req, res) => {
        try {
            const bookings = await HotelBooking.find().populate('user').populate('hotel').populate('room');
            res.json(bookings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getBookingById: async (req, res) => {
        try {
            const booking = await HotelBooking.findById(req.params.id).populate('user').populate('hotel').populate('room');
            if (!booking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(booking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createBooking: async (req, res) => {
        try {
            const newBooking = new HotelBooking(req.body);
            const savedBooking = await newBooking.save();
            res.json(savedBooking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateBooking: async (req, res) => {
        try {
            const updatedBooking = await HotelBooking.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            ).populate('user').populate('hotel').populate('room');
            if (!updatedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(updatedBooking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteBooking: async (req, res) => {
        try {
            const deletedBooking = await HotelBooking.findByIdAndDelete(req.params.id);
            if (!deletedBooking) {
                return res.status(404).json({ message: 'Booking not found' });
            }
            res.json(deletedBooking);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = hotelBookingController;