const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
customerName: {
type: String,
required: true,
},
customerEmail: {
type: String,
required: true,
},
flight: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Flight',
required: true,
},
paymentMethod: {
type: String,
required: true,
},
paymentDate: {
type: Date,
required: true,
},
paymentAmount: {
type: Number,
required: true,
},
});

module.exports = mongoose.model('Payment', paymentSchema);