const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {             // maskapai
        type: String,
        required: true
    },
    flightNumber: {         // nomor penerbangan
        type: String,
        required: true
    },
    origin: {                // asal
        type: String,
        required: true
    },
    destination: {          // tujuan
        type: String,
        required: true
    },
    departureTime: {          
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;