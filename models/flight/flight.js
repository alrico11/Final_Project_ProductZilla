const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    departure: [{
        departure_airport: {
            type: String,
            required: true
        },
        departure_city: {
            type: String,
            required: true
        },
        departure_country: {
            type: String,
            required: true
        },
        departure_date: {
            type: Date,
            required: true
        },
        departure_time: {
            type: String,
            required: true
        }
    }],
    arrival: [{
        arrival_airport: {
            type: String,
            required: true
        },
        arrival_city: {
            type: String,
            required: true
        },
        arrival_country: {
            type: String,
            required: true
        },
        arrival_date: {
            type: Date,
            required: true
        },
        arrival_time: {
            type: String,
            required: true
        }
    }],
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;