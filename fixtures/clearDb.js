const User = require('../models/user/user')
const Flight = require('../models/flight/flight')
const BookingFlight = require('../models/flight/booking')
const PaymentFlight = require('../models/flight/payment')
const Hotel = require('../models/hotel/hotel')
const BookingHotel = require('../models/hotel/booking')
const PaymentHotel = require('../models/hotel/payment')
async function deleteUser() {
    await User.deleteMany({});

    await Flight.deleteMany({});
    await BookingFlight.deleteMany({});
    await PaymentFlight.deleteMany({});
    
    await Hotel.deleteMany({});
    await BookingHotel.deleteMany({});
    await PaymentHotel.deleteMany({});
}

module.exports = {
    deleteUser
}