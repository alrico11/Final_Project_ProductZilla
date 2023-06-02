const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    hotelName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pictureHotelPath: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    facilities: [{
        type: String,
        required: true
    }],
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }]
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

// app.get('/hotels', async (req, res) => {
//     try {
//     const { city, checkInDate } = req.query;
//     // Cari hotel berdasarkan kota
//     const hotels = await Hotel.find({ city });
//     // Filter rooms yang tersedia pada tanggal booking yang diinginkan
//     const filteredHotels = hotels.map((hotel) => {
//       const availableRooms = hotel.rooms.filter((room) => {
//         const bookings = room.bookings.filter((booking) => {
//           return (
//             checkInDate >= booking.checkInDate &&
//             checkInDate <= booking.checkOutDate
//           );
//         });
//         return bookings.length < room.availableRooms;
//       });
//       return {
//         ...hotel.toJSON(),
//         rooms: availableRooms,
//       };
//     });
//     res.json(filteredHotels);
//     } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//     }
//     });