const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelTransactionSchema = new Schema({
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
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
}, { timestamps: true });

const HotelTransaction = mongoose.model('HotelTransaction', hotelTransactionSchema);

module.exports = HotelTransaction;