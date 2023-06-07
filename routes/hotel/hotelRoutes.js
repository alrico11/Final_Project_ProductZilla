const express = require('express');
const router = express.Router();
const hotelController = require('../../controllers/hotel/hotelController');
const roomsController = require('../../controllers/hotel/roomsController');
const authMiddleware = require('../../middleware/authMiddleware');
const isAdmin = require('../../middleware/isAdmin');

// Get all hotels
router.get('/api/hotels/', authMiddleware,hotelController.getAllHotels);

// Get hotel by ID
router.get('/api/hotels/:id', authMiddleware,hotelController.getHotelById);

// get hotel by City
router.get('/api/hotels/search/:city', authMiddleware,hotelController.searchByCity);

// Create new hotel
router.post('/api/hotels/', isAdmin,hotelController.createHotel);

// Update hotel by ID
router.put('/api/hotels/:id', isAdmin,hotelController.updateHotel);

// Delete hotel by ID
router.delete('/api/hotels/:id', isAdmin,hotelController.deleteHotel);

//ROOMS
// Add new room to hotel by ID
router.post('/api/hotels/:hotelId/rooms', isAdmin, roomsController.addNewRoom);

// Get all rooms from hotel by ID
router.get('/api/hotels/:hotelId/rooms', authMiddleware, roomsController.getHotelRoomsById);

// Update room from hotel by ID
router.put('/api/hotels/:hotelId/rooms/:roomId', isAdmin, roomsController.updateRoom);

// Delete room from hotel by ID
router.delete('/api/hotels/:hotelId/rooms/:roomId', isAdmin, roomsController.deleteRoom);

module.exports = router;