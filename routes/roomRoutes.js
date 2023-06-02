
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const isAdmin = require('../middleware/isAdmin');
// Get all rooms
router.get('/', roomController.getAllRooms);

// Get room by id
router.get('/:id', roomController.getRoomById);

// Create a new room
router.post('/', isAdmin,roomController.createRoom);

// Update a room
router.put('/:id', isAdmin,roomController.updateRoom);

// Delete a room
router.delete('/:id', isAdmin,roomController.deleteRoom);

module.exports = router;