const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
hotelName: {
type: String,
required: true,
},
roomType: {
type: String,
required: true,
},
pictureRoomPath: {
type: String,
required: true,
},
price: {
type: Number,
required: true,
},
availableRooms: {
type: Array,
required: true,
},
facility: {
type: String,
required: true,
},
});

module.exports = mongoose.model('Rooms', roomsSchema);