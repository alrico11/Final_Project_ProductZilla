const mongoose = require('mongoose');
const Booking = require('./booking');
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking_flight',
    required: true,
  },
  amount: {
        type: Number
  },
  proofPayment: {
    type: String,
    required: true,
},
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  paymentType: {
    type: String,
    enum: ['transfer', 'debit_online'],
    default: 'transfer',
  },
  billingNumber: {
    type: String,
    unique: true
}
}, { timestamps: true });

paymentSchema.pre('save', async function (next) {
  try {
    const booking = await Booking.findById(this.booking);
    if (!booking) {
      return next(new Error('Booking not found'));
    }
    this.amount = booking.totalPrice;
    this.bookingType = booking.bookingType;
    this.billingNumber = uuidv4();
    next();
  } catch (error) {
    next(error);
  }
});

const Payment = mongoose.model('Payment_flight', paymentSchema);

module.exports = Payment;