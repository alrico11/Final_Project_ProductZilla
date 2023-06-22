const Booking = require('../../models/hotel/booking');
const HotelRooms = require('../../models/hotel/hotel');

exports.bookRoom = async (req, res) => {
    try {
        const { hotelId, roomId, checkInDate, checkOutDate, guest, totalPrice, customer } = req.body;
        const room = await HotelRooms.findOne({ _id: hotelId, 'rooms._id': roomId }, { 'rooms.$': 1 }).exec();
        const bookedRooms = await Booking.find({ hotelId, roomId, checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate } }).exec();
        const totalBookedRooms = bookedRooms.reduce((total, booking) => total + booking.guest, 0);
        const availableRooms = room.rooms[0].availableRooms - totalBookedRooms;
        if (availableRooms < guest) {
            return res.status(400).json({ message: 'Kamar tidak tersedia di tanggal yang diminta' });
        }
        // Buat booking baru
        const booking = new Booking({
            hotelId,
            roomId,
            checkInDate,
            checkOutDate,
            guest,
            totalPrice,
            customer,
            user: req.user.id
        });
        await booking.save();
        await HotelRooms.updateOne({ _id: hotelId, 'rooms._id': roomId }, { inc: { 'rooms..availableRooms': -guest } }).exec();
        return res.status(200).json({
            message: 'Booking berhasil',
            data: booking
        });
    } catch (error) {
        
        return res.status(500).json({ message: 'Terjadi kesalahan saat melakukan booking' });
    }
};


exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).exec();
        if (!booking) {
            return res.status(404).json({ message: error });
        }
        return res.status(200).json(booking);
    } catch (error) {
       
        return res.status(500).json({ message: error });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().exec();
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};


exports.updateBooking = async (req, res) => {
    try {
        const { hotelId, roomId, checkInDate, checkOutDate, guest, totalPrice, customer } = req.body;
        const booking = await Booking.findById(req.params.id).exec();
        if (!booking) {
            return res.status(404).json({ message: 'Booking tidak ditemukan' });
        }
        if (booking.checkInDate < new Date()) {
            console.log(Date())
            return res.status(400).json({ message: 'Booking sudah terjadi, tidak dapat diubah' });
        }
        const room = await HotelRooms.findOne({ _id: hotelId, 'rooms._id': roomId }, { 'rooms.$': 1 }).exec();
        const bookedRooms = await Booking.find({ hotelId, roomId, checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate }, _id: { $ne: req.params.id } }).exec();
        const totalBookedRooms = bookedRooms.reduce((total, booking) => total + booking.guest, 0);
        const availableRooms = room.rooms[0].availableRooms - totalBookedRooms;
        if (availableRooms < guest) {
            return res.status(400).json({ message: 'Kamar tidak tersedia di tanggal yang diminta' });
        }
        booking.hotelId = hotelId;
        booking.roomId = roomId;
        booking.checkInDate = checkInDate;
        booking.checkOutDate = checkOutDate;
        booking.totalRoomBooked = guest;
        booking.totalPrice = totalPrice;
        booking.customer = customer;
        await booking.save();
        await HotelRooms.updateOne({ _id: hotelId, 'rooms._id': roomId }, { inc: { 'rooms..availableRooms': -guest } }).exec();
        const updatedBooking = await Booking.findById(req.params.id).exec();
        return res.status(200).json({
            message: 'Booking berhasil diubah',
            data: updatedBooking
        });
    } catch (error) {
           return res.status(500).json({ message: error });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body;

        // Cek apakah booking dengan ID yang diminta ada di database
        const booking = await Booking.findById(req.params.id).exec()
        if (!booking) {
            return res.status(400).json({ message: 'Booking tidak ditemukan' });
        }

        // Update jumlah kamar yang tersedia di database
        await HotelRooms.updateOne({ _id: booking.hotelId, 'rooms._id': booking.roomId }, { $inc: { 'rooms.$.availableRooms': booking.guest } }).exec();

        // Hapus booking dari database
        await Booking.deleteOne({ _id: bookingId }).exec();

        return res.status(200).json({ message: 'Booking berhasil dibatalkan' });
    } catch (error) {
      
        return res.status(500).json({ message: error });
    }
};