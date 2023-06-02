const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentTransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  paymentMethod: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failure'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);
module.exports = PaymentTransaction;