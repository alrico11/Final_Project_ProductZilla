const HotelRooms = require('../../models/hotel/hotel');

exports.addNewRoom = async (req, res) => {
    try {
        const { roomType, pictureRoomPath, amount, availableRooms, facilities } = req.body;
        const hotel = await HotelRooms.findById(req.params.hotelId).exec();
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel tidak ditemukan' });
        }
        const room = {
            roomType,
            pictureRoomPath,
            amount,
            availableRooms,
            facilities
        };
        hotel.rooms.push(room);
        await hotel.save();
        return res.status(200).json({
            message: 'Room berhasil ditambahkan ke hotel',
            data: room
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan room ke hotel' });
    }
};

exports.getHotelRoomsById = async (req, res) => {
    try {
        const hotel = await HotelRooms.findById(req.params.hotelId).exec();
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel tidak ditemukan' });
        }
        return res.status(200).json({
            message: 'Data room pada hotel berhasil didapatkan',
            data: hotel.rooms
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data room pada hotel' });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const { roomType, pictureRoomPath, amount, availableRooms, facilities } = req.body;
        const hotel = await HotelRooms.findById(req.params.hotelId).exec();
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel tidak ditemukan' });
        }
        const roomIndex = hotel.rooms.findIndex(room => room._id == req.params.roomId);
        if (roomIndex === -1) {
            return res.status(404).json({ message: 'Room tidak ditemukan pada hotel' });
        }
        hotel.rooms[roomIndex].roomType = roomType;
        hotel.rooms[roomIndex].pictureRoomPath = pictureRoomPath;
        hotel.rooms[roomIndex].amount = amount;
        hotel.rooms[roomIndex].availableRooms = availableRooms;
        hotel.rooms[roomIndex].facilities = facilities;
        await hotel.save();
        return res.status(200).json({
            message: 'Room pada hotel berhasil diupdate',
            data: hotel.rooms[roomIndex]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengupdate room pada hotel' });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const hotel = await HotelRooms.findById(req.params.hotelId).exec();
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel tidak ditemukan' });
        }
        const roomIndex = hotel.rooms.findIndex(room => room._id == req.params.roomId);
        if (roomIndex === -1) {
            return res.status(404).json({ message: 'Room tidak ditemukan pada hotel' });
        }
        const deletedRoom = hotel.rooms.splice(roomIndex, 1);
        await hotel.save();
        return res.status(200).json({
            message: 'Room pada hotel berhasil dihapus',
            data: deletedRoom
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus room pada hotel' });
    }
};

