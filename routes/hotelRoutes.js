const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

router.post('/', hotelController.createHotel);
router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotelById);
router.put('/:id', hotelController.updateHotelById);
router.delete('/:id', hotelController.deleteHotelById);

module.exports = router;