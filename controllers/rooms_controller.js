const Rooms = require('../models/rooms');

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const room = new Rooms(req.body);
    await room.save();
    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Rooms.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a room by ID
exports.updateRoomById = async (req, res) => {
  try {
    const room = await Rooms.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a room by ID
exports.deleteRoomById = async (req, res) => {
  try {
    const room = await Rooms.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully', room });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
