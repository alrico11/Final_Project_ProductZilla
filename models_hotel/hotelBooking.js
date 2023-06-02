const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelBookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });

const HotelBooking = mongoose.model('HotelBooking', hotelBookingSchema);

module.exports = HotelBooking;