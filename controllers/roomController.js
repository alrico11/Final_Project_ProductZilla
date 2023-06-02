
const Room = require('../models_hotel/room');

exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('hotel');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('hotel');
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRoom = async (req, res) => {
    const room = new Room({
        hotel: req.body.hotel,
        roomType: req.body.roomType,
        price: req.body.price,
        availableRooms: req.body.availableRooms
    });

    try {
        const newRoom = await room.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        room.hotel = req.body.hotel;
        room.roomType = req.body.roomType;
        room.price = req.body.price;
        room.availableRooms = req.body.availableRooms;

        const updatedRoom = await room.save();
        res.status(200).json(updatedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        await room.remove();
        res.status(200).json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};