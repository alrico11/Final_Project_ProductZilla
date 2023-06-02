const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomType: {
        type: String,
        required: true
    },
    pictureRoomPath: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    availableRooms: {
        type: Number,
        required: true
    },
    facilities: [{
        type: String,
        required: true
    }],
}, { timestamps: true });

const hotelSchema = new Schema({
    hotelName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pictureHotelPath: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    facilities: [{
        type: String,
        required: true
    }],
    rooms: [roomSchema]
}, { timestamps: true });

const HotelRooms = mongoose.model('HotelRooms', hotelSchema);

module.exports = HotelRooms