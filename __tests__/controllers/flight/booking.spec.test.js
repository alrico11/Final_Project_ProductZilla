
const bookingController = require('../../../controllers/flight/bookingController');
const Booking = require('../../../models/flight/booking');

jest.mock('../../../models/flight/booking');

describe('Booking Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
            send: jest.fn(),
        };
    });
    describe('getAllBookings', () => {
        it('should get all bookings', async () => {
            const bookings = [
                {
                    _id: '1',
                    user: 'user1',
                    flight: 'flight1',
                    passengers: 1,
                    bookingType: 'economy',
                    totalPrice: 100,
                },
                {
                    _id: '2',
                    user: 'user2',
                    flight: 'flight2',
                    passengers: 2,
                    bookingType: 'business',
                    totalPrice: 200,
                },
            ];
            Booking.find.mockResolvedValue(bookings);
            await bookingController.getAllBookings(req, res);
            //console.log(res.json.mock.calls)
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });

       
    });

    describe('getBookingById', () => {
        it('should get a booking by id', async () => {
            const booking = {
                _id: '1',
                user: 'user1',
                flight: 'flight1',
                passengers: 1,
                bookingType: 'economy',
                totalPrice: 100,
            };

            Booking.findById.mockResolvedValue(booking);

            req.params = { id: '1' };

            await bookingController.getBookingById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });

    describe('createBooking', () => {
        it('should create a new booking', async () => {
            const newBooking = {
                _id: '3',
                user: 'user1',
                flight: 'flight1',
                passengers: 1,
                bookingType: 'economy',
                totalPrice: 100,
            };

            Booking.mockReturnValue(newBooking);

            req.user = { id: 'user1' };
            req.body = {
                flight: 'flight1',
                passengers: 1,
                bookingType: 'economy',
                totalPrice: 100,
            };

            await bookingController.createBooking(req, res);

            expect(Booking).toHaveBeenCalledWith({
                user: 'user1',
                flight: 'flight1',
                passengers: 1,
                bookingType: 'economy',
                totalPrice: 100,
            });
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });

    describe('updateBooking', () => {
        it('should update an existing booking', async () => {
            const booking = {
                _id: '1',
                user: 'user1',
                flight: 'flight1',
                passengers: 1,
                bookingType: 'economy',
                totalPrice: 100,
                save: jest.fn(),
            };
            Booking.findById.mockResolvedValue(booking);
            req.params = { id: '1' };
            req.body = {
                flight: 'flight2',
                passengers: 2,
                bookingType: 'business',
                totalPrice: 200,
            };
            await bookingController.updateBooking(req, res);
            // console.log(res.json.mock.calls)

            // expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });

    describe('deleteBooking', () => {
        it('should delete a booking', async () => {
            const booking = {
                _id: '1',
                user: 'user1',
                flight: 'flight1',
                passengers: 1,
                bookingType: 'economy',
                totalPrice: 100,
                deleteOne: jest.fn(),
            };
            Booking.findById.mockResolvedValue(booking);
            req.params = { id: '1' };
            await bookingController.deleteBooking(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });

    });
});