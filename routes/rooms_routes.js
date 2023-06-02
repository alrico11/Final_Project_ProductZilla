const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/rooms_controller');

// Create a new room
router.post('/rooms', roomsController.createRoom);

// Get all rooms
router.get('/rooms', roomsController.getAllRooms);

// Get a single room by ID
router.get('/rooms/:id', roomsController.getRoomById);

// Update a room by ID
router.put('/rooms/:id', roomsController.updateRoomById);

// Delete a room by ID
router.delete('/rooms/:id', roomsController.deleteRoomById);

module.exports = router;
