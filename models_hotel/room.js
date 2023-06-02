const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    pictureRoomPath: {
        type: String,
        required: true
    },
    price: {
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

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;