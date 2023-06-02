const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  billingNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

module.exports = PaymentMethod;