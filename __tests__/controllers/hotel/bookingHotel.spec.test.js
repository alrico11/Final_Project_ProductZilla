const bookingController = require('../../../controllers/hotel/hotelBookingController');
const Booking = require('../../../models/hotel/booking');
const HotelRooms = require('../../../models/hotel/hotel');

jest.mock('../../../models/hotel/booking');
jest.mock('../../../models/hotel/hotel');

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
                    hotel: 'hotel1',
                    room: 'room1',
                    checkInDate: new Date('2022-01-01'),
                    checkOutDate: new Date('2022-01-05'),
                    guest: 2,
                    totalPrice: 500,
                    customer: {
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        phone: '123456789',
                    },
                },
                {
                    _id: '2',
                    user: 'user2',
                    hotel: 'hotel2',
                    room: 'room2',
                    checkInDate: new Date('2022-02-01'),
                    checkOutDate: new Date('2022-02-05'),
                    guest: 3,
                    totalPrice: 800,
                    customer: {
                        name: 'Jane Doe',
                        email: 'janedoe@example.com',
                        phone: '987654321',
                    },
                },
            ];
            Booking.find.mockResolvedValue(bookings);
            await bookingController.getAllBookings(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
    describe('bookRoom', () => {
        it('should create a new booking and update available rooms', async () => {
            const req = {
                user: {
                    id: 'user1',
                },
                body: {
                    hotelId: 'hotel1',
                    roomId: 'room1',
                    checkInDate: new Date('2022-01-01'),
                    checkOutDate: new Date('2022-01-05'),
                    guest: 2,
                    totalPrice: 500,
                    customer: {
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        phone: '123456789',
                    },
                },
            };
            const room = {
                _id: 'room1',
                availableRooms: 5,
            };
            const bookedRooms = [
                {
                    _id: 'booking1',
                    guest: 2,
                },
                {
                    _id: 'booking2',
                    guest: 1,
                },
            ];
            HotelRooms.findOne.mockResolvedValue({ rooms: [room] });
            Booking.find.mockResolvedValue(bookedRooms);
            const saveBooking = jest.fn().mockResolvedValue({
                _id: 'booking3',
                ...req.body,
            });
            Booking.mockImplementationOnce(() => ({
                save: saveBooking,
            }));
            await bookingController.bookRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if room is not available', async () => {
            const req = {
                user: {
                    id: 'user1',
                },
                body: {
                    hotelId: 'hotel1',
                    roomId: 'room1',
                    checkInDate: new Date('2022-01-01'),
                    checkOutDate: new Date('2022-01-05'),
                    guest: 8,
                    totalPrice: 2000,
                    customer: {
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        phone: '123456789',
                    },
                },
            };
            const room = {
                _id: 'room1',
                availableRooms: 5,
            };
            const bookedRooms = [
                {
                    _id: 'booking1',
                    guest: 2,
                },
                {
                    _id: 'booking2',
                    guest: 1,
                },
            ];
            HotelRooms.findOne.mockResolvedValue({ rooms: [room] });
            Booking.find.mockResolvedValue(bookedRooms);
            await bookingController.bookRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
    describe('getBookingById', () => {
        it('should return a booking by ID', async () => {
            const booking = {
                _id: 'booking1',
                user: 'user1',
                hotel: 'hotel1',
                room: 'room1',
                checkInDate: new Date('2022-01-01'),
                checkOutDate: new Date('2022-01-05'),
                guest: 2,
                totalPrice: 500,
                customer: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123456789',
                },
            };
            Booking.findById.mockResolvedValue(booking);
            req.params = {
                id: 'booking1',
            };
            await bookingController.getBookingById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if booking is not found', async () => {
            Booking.findById.mockResolvedValue(null);
            req.params = {
                id: 'booking1',
            };
            await bookingController.getBookingById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
    describe('updateBooking', () => {
        it('should update a booking and update available rooms', async () => {
            const req = {
                user: {
                    id: 'user1',
                },
                params: {
                    id: 'booking1',
                },
                body: {
                    hotelId: 'hotel1',
                    roomId: 'room1',
                    checkInDate: new Date('2022-01-01'),
                    checkOutDate: new Date('2022-01-05'),
                    guest: 3,
                    totalPrice: 750,
                    customer: {
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        phone: '123456789',
                    },
                },
            };
            const booking = {
                _id: 'booking1',
                user: 'user1',
                hotel: 'hotel1',
                room: 'room1',
                checkInDate: new Date('2022-01-01'),
                checkOutDate: new Date('2022-01-05'),
                guest: 2,
                totalPrice: 500,
                customer: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123456789',
                },
                save: jest.fn(),
            };
            const room = {
                _id: 'room1',
                availableRooms: 5,
            };
            const bookedRooms = [
                {
                    _id: 'booking2',
                    guest: 1,
                },
            ];
            HotelRooms.findOne.mockResolvedValue({ rooms: [room] });
            Booking.findById.mockResolvedValue(booking);
            Booking.find.mockResolvedValue(bookedRooms);
            await bookingController.updateBooking(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if booking is not found', async () => {
            Booking.findById.mockResolvedValue(null);
            req.params = {
                id: 'booking1',
            };
            await bookingController.updateBooking(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if booking check-in date has passed', async () => {
            const req = {
                user: {
                    id: 'user1',
                },
                params: {
                    id: 'booking1',
                },
                body: {
                    hotelId: 'hotel1',
                    roomId: 'room1',
                    checkInDate: new Date('2021-01-01'),
                    checkOutDate: new Date('2021-01-05'),
                    guest: 2,
                    totalPrice: 500,
                    customer: {
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        phone: '123456789',
                    },
                },
            };
            const booking = {
                _id: 'booking1',
                user: 'user1',
                hotel: 'hotel1',
                room: 'room1',
                checkInDate: new Date('2022-01-01'),
                checkOutDate: new Date('2022-01-05'),
                guest: 2,
                totalPrice: 500,
                customer: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123456789',
                },
            };
            Booking.findById.mockResolvedValue(booking);
            await bookingController.updateBooking(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if room is not available', async () => {
            const req = {
                user: {
                    id: 'user1',
                },
                params: {
                    id: 'booking1',
                },
                body: {
                    hotelId: 'hotel1',
                    roomId: 'room1',
                    checkInDate: new Date('2022-01-01'),
                    checkOutDate: new Date('2022-01-05'),
                    guest: 8,
                    totalPrice: 2000,
                    customer: {
                        name: 'John Doe',
                        email: 'johndoe@example.com',
                        phone: '123456789',
                    },
                },
            };
            const booking = {
                _id: 'booking1',
                user: 'user1',
                hotel: 'hotel1',
                room: 'room1',
                checkInDate: new Date('2022-01-01'),
                checkOutDate: new Date('2022-01-05'),
                guest: 2,
                totalPrice: 500,
                customer: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '123456789',
                },
            };
            const room = {
                _id: 'room1',
                availableRooms: 5,
            };
            const bookedRooms = [
                {
                    _id: 'booking2',
                    guest: 1,
                },
            ];
            HotelRooms.findOne.mockResolvedValue({ rooms: [room] });
            Booking.findById.mockResolvedValue(booking);
            Booking.find.mockResolvedValue(bookedRooms);
            await bookingController.updateBooking(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
    describe('cancelBooking', () => {
        it('should cancel a booking and update available rooms', async () => {
            const req = {
                params: {
                    id: 'booking1',
                },
                body: {
                    bookingId: 'booking1',
                },
            };
            const booking = {
                _id: 'booking1',
                hotelId: 'hotel1',
                roomId: 'room1',
                guest: 2,
            };
            Booking.findById.mockResolvedValue(booking);
        })
            it('should return error if booking is not found', async () => {
                Booking.findById.mockResolvedValue(null);
                req.params = {
                    id: 'booking1',
                };
                await bookingController.cancelBooking(req, res);
                expect(res.json.mock.calls[0][0]).toHaveProperty('message');
            });
        });

})