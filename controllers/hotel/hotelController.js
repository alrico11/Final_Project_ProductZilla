const Hotel = require('../../models/hotel/hotel');

const hotelController = {
    getAllHotels: async (req, res) => {
        try {
            const hotels = await Hotel.find();
            return res.json(hotels);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getHotelById: async (req, res) => {
        try {
            const hotel = await Hotel.findById(req.params.id).populate('rooms');
            if (!hotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            return res.json(hotel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    searchByCity: async (req, res) => {
        try {
            const { city } = req.params;
            const hotels = await Hotel.find({ city: { $regex: new RegExp(city, "i") } });

            return res.status(200).json(hotels);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    createHotel: async (req, res) => {
        try {
            const newHotel = new Hotel(req.body);
            const savedHotel = await newHotel.save();
            return res.json(savedHotel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateHotel: async (req, res) => {
        try {
            const updatedHotel = await Hotel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedHotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            return res.json(updatedHotel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteHotel: async (req, res) => {
        try {
            const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
            if (!deletedHotel) {
                return res.status(404).json({ message: 'Hotel not found' });
            }
            return res.json(deletedHotel);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = hotelController;