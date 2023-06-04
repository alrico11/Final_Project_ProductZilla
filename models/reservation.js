const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payments',
    required: true,
  },
  reservationDate: {
    type: Date,
    required: true,
  },
  reservationCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Reservations', reservationSchema);
