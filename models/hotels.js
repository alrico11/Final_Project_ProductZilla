const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  hotelAddress: {
    type: String,
    required: true,
  },
  hotelPhone: {
    type: String,
    required: true,
  },
  hotelEmail: {
    type: String,
    required: true,
  },
  hotelPicturePath: {
    type: String,
    required: true,
  },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
  }],
});

module.exports = mongoose.model('Hotels', hotelsSchema);
