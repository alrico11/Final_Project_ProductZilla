const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentHotelSchema = new Schema({
    hotelBooking: {
        type: Schema.Types.ObjectId,
        ref: 'HotelBooking',
        required: true,
    },
    paymentDate: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const PaymentHotel = mongoose.model('PaymentHotel', paymentHotelSchema);

module.exports = PaymentHotel;