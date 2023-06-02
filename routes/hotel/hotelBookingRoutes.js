
const express = require('express');
const router = express.Router();
const HotelRooms = require('../../models/hotel/hotel');
const Booking = require('../../models/hotel/booking');
const Payment = require('../../models/hotel/payment');

router.post('/api/book', async (req, res) => {
    try {
        const { hotelId, roomId, checkInDate, checkOutDate, guest, totalPrice, customer } = req.body;
        // Cek apakah kamar masih tersedia di tanggal yang diminta
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
            customer
        });
        await booking.save();
        await HotelRooms.updateOne({ _id: hotelId, 'rooms._id': roomId }, { inc: { 'rooms..availableRooms': -guest } }).exec();
        return res.status(200).json({ message: 'Booking berhasil' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat melakukan booking' });
    }
});

router.post('/api/cancel', async (req, res) => {
    try {
        const { bookingId } = req.body;

        // Cek apakah booking dengan ID yang diminta ada di database
        const booking = await Booking.findById(bookingId).exec();
        if (!booking) {
            return res.status(400).json({ message: 'Booking tidak ditemukan' });
        }

        // Update jumlah kamar yang tersedia di database
        await HotelRooms.updateOne({ _id: booking.hotelId, 'rooms._id': booking.roomId }, { $inc: { 'rooms.$.availableRooms': booking.guest } }).exec();

        // Hapus booking dari database
        await Booking.deleteOne({ _id: bookingId }).exec();

        return res.status(200).json({ message: 'Booking berhasil dibatalkan' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat membatalkan booking' });
    }
});

router.post('/api/payment', async (req, res) => {
    try {
        const { bookingId, amount, paymentType } = req.body;

        // Cek apakah booking dengan ID yang diminta ada di database
        const booking = await Booking.findById(bookingId).exec();
        if (!booking) {
            return res.status(400).json({ message: 'Booking tidak ditemukan' });
        }

        // Buat data pembayaran baru
        const payment = new Payment({
            bookingId,
            amount,
            paymentType,
            billingNumber,
        });
        await payment.save();

        // Update status pembayaran di booking
        await Booking.updateOne({ _id: bookingId }, { $set: { paymentStatus: 'paid' } }).exec();

        return res.status(200).json({ message: 'Pembayaran berhasil' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat melakukan pembayaran' });
    }
});

module.exports = router;