const hotelRoomController = require('../../../controllers/hotel/roomsController');
const Hotel = require('../../../models/hotel/hotel');
jest.mock('../../../models/hotel/hotel');

describe('Hotel Room Controller', () => {
    let req;
    let res;
    beforeEach(() => {
        req = {
            params: {},
            body: {},
        };
        res = {
            json: jest.fn(),
            status: jest.fn(() => res),
            send: jest.fn(),
        };
    });
    describe('addNewRoom', () => {
        it('should add new room to hotel', async () => {
            const hotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: [],
            };
            const newRoom = {
                roomType: 'Single',
                pictureRoomPath: '/path/to/picture',
                amount: 100000,
                availableRooms: 5,
                facilities: ['AC', 'TV'],
            };
            Hotel.findById.mockResolvedValue(hotel);
            req.params.hotelId = '1';
            req.body = newRoom;
            await hotelRoomController.addNewRoom(req, res);
           // console.log(res.json.mock.calls)
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if hotel not found', async () => {
            Hotel.findById.mockResolvedValue(null);
            req.params.hotelId = '1';
            await hotelRoomController.addNewRoom(req, res);
            // console.log(res.json.mock.calls)
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
    describe('getHotelRoomsById', () => {
        it('should get hotel rooms by id', async () => {
            const hotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: [
                    {
                        _id: '1',
                        roomType: 'Single',
                        pictureRoomPath: '/path/to/picture',
                        amount: 100000,
                        availableRooms: 5,
                        facilities: ['AC', 'TV'],
                    },
                    {
                        _id: '2',
                        roomType: 'Double',
                        pictureRoomPath: '/path/to/picture',
                        amount: 200000,
                        availableRooms: 3,
                        facilities: ['AC', 'TV', 'Refrigerator'],
                    },
                ],
            };
            Hotel.findById.mockResolvedValue(hotel);
            req.params.hotelId = '1';
            await hotelRoomController.getHotelRoomsById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if hotel not found', async () => {
            Hotel.findById.mockResolvedValue(null);
            req.params.hotelId = '1';
            await hotelRoomController.getHotelRoomsById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
    describe('updateRoom', () => {
        it('should update hotel room', async () => {
            const hotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: [
                    {
                        _id: '1',
                        roomType: 'Single',
                        pictureRoomPath: '/path/to/picture',
                        amount: 100000,
                        availableRooms: 5,
                        facilities: ['AC', 'TV'],
                    },
                    {
                        _id: '2',
                        roomType: 'Double',
                        pictureRoomPath: '/path/to/picture',
                        amount: 200000,
                        availableRooms: 3,
                        facilities: ['AC', 'TV', 'Refrigerator'],
                    },
                ],
            };
            const updatedRoom = {
                roomType: 'Triple',
                pictureRoomPath: '/path/to/picture',
                amount: 300000,
                availableRooms: 2,
                facilities: ['AC', 'TV', 'Refrigerator', 'Wifi'],
            };
            Hotel.findById.mockResolvedValue(hotel);
            req.params.hotelId = '1';
            req.params.roomId = '2';
            req.body = updatedRoom;
            await hotelRoomController.updateRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if hotel not found', async () => {
            Hotel.findById.mockResolvedValue(null);
            req.params.hotelId = '1';
            req.params.roomId = '1';
            await hotelRoomController.updateRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if room not found', async () => {
            const hotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: [
                    {
                        _id: '1',
                        roomType: 'Single',
                        pictureRoomPath: '/path/to/picture',
                        amount: 100000,
                        availableRooms: 5,
                        facilities: ['AC', 'TV'],
                    },
                ],
            };
            Hotel.findById.mockResolvedValue(hotel);
            req.params.hotelId = '1';
            req.params.roomId = '2';
            await hotelRoomController.updateRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });

    });
    describe('deleteRoom', () => {
        it('should delete hotel room', async () => {
            const hotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: [
                    {
                        _id: '1',
                        roomType: 'Single',
                        pictureRoomPath: '/path/to/picture',
                        amount: 100000,
                        availableRooms: 5,
                        facilities: ['AC', 'TV'],
                    },
                    {
                        _id: '2',
                        roomType: 'Double',
                        pictureRoomPath: '/path/to/picture',
                        amount: 200000,
                        availableRooms: 3,
                        facilities: ['AC', 'TV', 'Refrigerator'],
                    },
                ],
            };
            const deletedRoom = hotel.rooms[1];
            Hotel.findById.mockResolvedValue(hotel);
            req.params.hotelId = '1';
            req.params.roomId = '2';
            await hotelRoomController.deleteRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if hotel not found', async () => {
            Hotel.findById.mockResolvedValue(null);
            req.params.hotelId = '1';
            req.params.roomId = '1';
            await hotelRoomController.deleteRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return error if room not found', async () => {
            const hotel = {
                _id: '1',
                name: 'hotel1',
                city: 'city1',
                rooms: [
                    {
                        _id: '1',
                        roomType: 'Single',
                        pictureRoomPath: '/path/to/picture',
                        amount: 100000,
                        availableRooms: 5,
                        facilities: ['AC', 'TV'],
                    },
                ],
            };
            Hotel.findById.mockResolvedValue(hotel);
            req.params.hotelId = '1';
            req.params.roomId = '2';
            await hotelRoomController.deleteRoom(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
});