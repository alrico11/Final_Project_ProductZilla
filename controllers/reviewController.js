const Review = require('../models/review');

exports.createReview = async (req, res) => {
try {
const { reservation, user, hotel, rating, comment } = req.body;
const newReview = new Review({
reservation,
user,
hotel,
rating,
comment,
});
const savedReview = await newReview.save();
res.status(201).json(savedReview);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
};

exports.getReviewsByHotel = async (req, res) => {
try {
const { hotelId } = req.params;
const reviews = await Review.find({ hotel: hotelId }).populate('user', 'username').exec();
res.status(200).json(reviews);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
};

exports.deleteReview = async (req, res) => {
try {
const { reviewId } = req.params;
await Review.findByIdAndDelete(reviewId);
res.status(200).json({ message: 'Review deleted successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Server Error' });
}
};