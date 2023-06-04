const Hotel = require('../models/hotels');

const createHotel = async (req, res) => {
  try {
    const hotel = new Hotel({
      hotelName: req.body.hotelName,
      hotelAddress: req.body.hotelAddress,
      hotelPhone: req.body.hotelPhone,
      hotelEmail: req.body.hotelEmail,
      hotelPicturePath: req.body.hotelPicturePath,
    });

    await hotel.save();

    res.status(201).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create hotel',
      error: error.message,
    });
  }
};

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('rooms');

    res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get hotels',
      error: error.message,
    });
  }
};

const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate('rooms');

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get hotel by ID',
      error: error.message,
    });
  }
};

const updateHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        hotelName: req.body.hotelName,
        hotelAddress: req.body.hotelAddress,
        hotelPhone: req.body.hotelPhone,
        hotelEmail: req.body.hotelEmail,
        hotelPicturePath: req.body.hotelPicturePath,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update hotel by ID',
      error: error.message,
    });
  }
};

const deleteHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Hotel deleted successfully',
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete hotel by ID',
      error: error.message,
    });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotelById,
  updateHotelById,
  deleteHotelById,
};
