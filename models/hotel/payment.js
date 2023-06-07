const mongoose = require('mongoose');
const Booking = require('./booking');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentType: {
        type: String,
        enum: ['lobby', 'transfer', 'debit_online'],
        default: 'lobby'
    },
    billingNumber: {
        type: String,
        unique: true
    }
}, { timestamps: true });

paymentSchema.pre('save', async function(next) {
    try {
        const booking = await Booking.findById(this.bookingId).exec();
        if (!booking) {
            throw new Error('Booking tidak ditemukan');
        }
        this.amount = booking.totalPrice;
        this.billingNumber = uuidv4();
        next();
    } catch (error) {
        next(error);
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;