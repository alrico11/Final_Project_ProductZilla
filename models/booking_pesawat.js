const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightBookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    passengers: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FlightBooking = mongoose.model('FlightBooking', flightBookingSchema);

module.exports = { FlightBooking, HotelBooking };