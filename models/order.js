
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    total_tiket: { type: int, required: true },
    total_price: {
        type: mongoose.Decimal128,
        required: true
      },
    status: { type: String,default: false}
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;