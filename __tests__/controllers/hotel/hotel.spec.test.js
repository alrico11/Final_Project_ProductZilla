const hotelController = require('../../../controllers/hotel/hotelController');
const Hotel = require('../../../models/hotel/hotel');
jest.mock('../../../models/hotel/hotel');

describe('Hotel Controller', () => {
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
    describe('getAllHotels', () => {
        it('should get all hotels', async () => {
            const hotels = [
                {
                    _id: '1',
                    name: 'hotel1',
                    city: 'city1',
                    rooms: ['room1', 'room2'],
                },
                {
                    _id: '2',
                    name: 'hotel2',
                    city: 'city2',
                    rooms: ['room3', 'room4'],
                },
            ];
            Hotel.find.mockResolvedValue(hotels);
            await hotelController.getAllHotels(req, res);
            expect(res.json.mock.calls[0][0]).toEqual(hotels);
        });
    });

    describe('getHotelById', () => {
        it('should get hotel by id', async () => {
            const hotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            Hotel.findById.mockResolvedValue(hotel);
            req.params = { id: '1' };
            await hotelController.getHotelById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error message if hotel not found', async () => {
            Hotel.findById.mockResolvedValue(null);
            req.params = { id: '1' };
            await hotelController.getHotelById(req, res);
            expect(res.status.mock.calls[0][0]).toBe(500);
        });
    });

    describe('searchByCity', () => {
        it('should search hotels by city', async () => {
            const hotels = [
                {
                    _id: '1',
                    name: 'hotel1',
                    city: 'city1',
                    rooms: ['room1', 'room2'],
                },
                {
                    _id: '2',
                    name: 'hotel2',
                    city: 'city1',
                    rooms: ['room3', 'room4'],
                },
            ];
            Hotel.find.mockResolvedValue(hotels);
            req.params = { city: 'city1' };
            await hotelController.searchByCity(req, res);
            expect(res.json.mock.calls[0][0]).toEqual(hotels);
        });
        it('should return error message if search fails', async () => {
            Hotel.find.mockRejectedValue(new Error('Database error'));
            req.params = { city: 'city1' };
            await hotelController.searchByCity(req, res);
            expect(res.status.mock.calls[0][0]).toBe(500);
            expect(res.json.mock.calls[0][0]).toEqual({ message: 'Internal Server Error' });
        });
    });

    describe('createHotel', () => {
        it('should create a new hotel', async () => {
            const newHotel = {
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            const savedHotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            Hotel.mockReturnValue({
                save: jest.fn().mockResolvedValue(savedHotel),
            });
            req.body = newHotel;
            await hotelController.createHotel(req, res);
            expect(Hotel).toHaveBeenCalledWith(newHotel);
            expect(res.json.mock.calls[0][0]).toEqual(savedHotel);
        });
        it('should return error message if creation fails', async () => {
            Hotel.mockReturnValue({
                save: jest.fn().mockRejectedValue(new Error('Database error')),
            });
            req.body = {
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            await hotelController.createHotel(req, res);
            expect(res.status.mock.calls[0][0]).toBe(500);
            expect(res.json.mock.calls[0][0]).toEqual({ message: 'Internal server error' });
        });
    });

    describe('updateHotel', () => {
        it('should update hotel by id', async () => {
            const updatedHotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            Hotel.findByIdAndUpdate.mockResolvedValue(updatedHotel);
            req.params = { id: '1' };
            req.body = {
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            await hotelController.updateHotel(req, res);
            expect(Hotel.findByIdAndUpdate).toHaveBeenCalledWith(
                '1',
                {
                    name: 'hotel1',
                    city: 'city1',
                    rooms: ['room1', 'room2'],
                },
                { new: true }
            );
            expect(res.json.mock.calls[0][0]).toEqual(updatedHotel);
        });
        it('should return error message if hotel not found', async () => {
            Hotel.findByIdAndUpdate.mockResolvedValue(null);
            req.params = { id: '1' };
            req.body = {
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            await hotelController.updateHotel(req, res);
            expect(res.status.mock.calls[0][0]).toBe(404);
            expect(res.json.mock.calls[0][0]).toEqual({ message: 'Hotel not found' });
        });
    });

    describe('deleteHotel', () => {
        it('should delete hotel by id', async () => {
            const deletedHotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: ['room1', 'room2'],
            };
            Hotel.findByIdAndDelete.mockResolvedValue(deletedHotel);
            req.params = { id: '1' };
            await hotelController.deleteHotel(req, res);
            expect(Hotel.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.json.mock.calls[0][0]).toEqual(deletedHotel);
        });
        it('should return error message if hotel not found', async () => {
            Hotel.findByIdAndDelete.mockResolvedValue(null);
            req.params = { id: '1' };
            await hotelController.deleteHotel(req, res);
            expect(res.status.mock.calls[0][0]).toBe(404);
            expect(res.json.mock.calls[0][0]).toEqual({ message: 'Hotel not found' });
        });
    });
});