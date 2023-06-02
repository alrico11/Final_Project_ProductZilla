const express = require('express');
const router = express.Router();
const hotelController = require('../../controllers/hotel/hotelController');

// Get all hotels
router.get('/api/hotels/', hotelController.getAllHotels);

// Get hotel by ID
router.get('/api/hotels/:id', hotelController.getHotelById);

// get hotel by City
router.get('/api/hotels/search/:city', hotelController.searchByCity);

// Create new hotel
router.post('/api/hotels/', hotelController.createHotel);

// Update hotel by ID
router.put('/api/hotels/:id', hotelController.updateHotel);

// Delete hotel by ID
router.delete('/api/hotels/:id', hotelController.deleteHotel);

module.exports = router;