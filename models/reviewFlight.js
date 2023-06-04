const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  reviewDate: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
