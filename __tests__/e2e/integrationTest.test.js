const { app } = require('../../app');
const { login } = require('../../controllers/auth/auth');
const { disconnect } = require('../../database');
const { deleteUser } = require('../../fixtures/clearDb')
require('dotenv').config();


const request = require('supertest');

let token = ""
let adminToken = ""
let idUser = ""
let flightId = ""
bookingFlightId = ""
paymentFlightId = ""
hotelsId = ""
roomsId = ""
bookingHotelsId = ""
paymentHotelsId = ""
beforeAll(async () => {
    await deleteUser();
});

describe('===============USER ADMIN', () => {
    describe('POST /api/admin/', () => {
        it('should create a new admin successfully', async () => {
            const res = await request(app)
                .post('/api/admin/')
                .set('Authorization', process.env.key)
                .send({
                    fullname: 'John Doe',
                    email: 'admin@example.com',
                    password: 'admin',
                    telephone: '08123456789',
                    birth_date: '1990-01-01'
                });
            idUser = res.body._id
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.fullname).toEqual('John Doe');
            expect(res.body.email).toEqual('admin@example.com');
            expect(res.body.telephone).toEqual('08123456789');
            expect(res.body.isAdmin).toBeTruthy();
        });

    })
    describe('LOGIN ADMIN', () => {
        it('should login admin and show token', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    email: 'admin@example.com',
                    password: 'admin'
                })

            adminToken = res.body.token
            expect(res.statusCode).toEqual(200)
            expect(res.body.user).toHaveProperty('_id')
        })
    })

})

describe('===============USER API', () => {
    describe('POST /api/users/', () => {
        it('should create a new user successfully', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    fullname: 'John Doe',
                    email: 'johndoe@example.com',
                    password: 'password',
                    telephone: '08123456789',
                    birth_date: '1990-01-01'
                });
            idUser = res.body._id
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.fullname).toEqual('John Doe');
            expect(res.body.email).toEqual('johndoe@example.com');
            expect(res.body.telephone).toEqual('08123456789');
        })

        it('should return 400 User validation failed: birth_date: Path `birth_date` is required.', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    fullname: 'joneqwe',
                    email: 'joneqwe@example.com',
                    password: 'password',
                    telephone: '08123456789',
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error_message')
        })
        it('should return 400 E11000 duplicate key error collection: bookings-apps.users index: email_1 dup key: { email: "johndoe@example.com" }', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    fullname: 'John Doe',
                    email: 'johndoe@example.com',
                    password: 'password',
                    telephone: '08123456789',
                    birth_date: '1990-01-01'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error_message')
        })
        it('should return 400 User validation failed: telephone: Path `telephone` is required.', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    fullname: 'John Doe',
                    email: 'johndoe@example.com',
                    password: 'password',
                    birth_date: '1990-01-01'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error_message')
        })
        it('should return 400 User validation failed: password: Path `password` is required.', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    fullname: 'John Doe',
                    email: 'johndoe@example.com',
                    telephone: '08123456789',
                    birth_date: '1990-01-01'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error_message')
        })
        it('should return 400 User validation failed: email: Path `email` is required.', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    fullname: 'John Doe',
                    password: 'password',
                    telephone: '08123456789',
                    birth_date: '1990-01-01'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error_message')
        })
        it('should return 400 User validation failed: fullname: Path `fullname` is required.', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    email: 'johndoe@example.com',
                    password: 'password',
                    telephone: '08123456789',
                    birth_date: '1990-01-01'
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error_message')
        })
    })
    describe('LOGIN USERS', () => {
        it('should login users and show token', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    email: 'johndoe@example.com',
                    password: 'password'
                })

            token = res.body.token
            expect(res.statusCode).toEqual(200)
            expect(res.body.user).toHaveProperty('_id')
        })
        it('should return Invalid credentials', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    email: 'johndoe@example.com',
                    password: 'passwordsalah'
                })
            expect(res.statusCode).toEqual(401)
            expect(res.body.message).toEqual('Invalid credentials')
        })
        it('should return 400 Email and password are required', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    password: 'passwordsalah'
                })

            // expect(res.statusCode).toEqual(401)
            // expect(res.body.message).toEqual('Invalid credentials')
        })
        it('should return 400 Email and password are required', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    email: 'johndoe@example.com',
                })
            expect(res.statusCode).toEqual(400)
            expect(res.body.message).toEqual('Email and password are required')
        })
    })
    describe('GET USER', () => {
        it('should get user data', async () => {
            const res = await request(app)
                .get('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)
            expect(res.body).toHaveProperty('_id')
            // console.log(res.body)
        })
        it('should return User not found', async () => {
            const res = await request(app)
                .get('/api/users/' + '6491d77dcc63b60a0904ed2c')
                .set('Authorization', `Bearer ${token}`)
            // console.log(res.status)
            // console.log(res.body)
            expect(res.statusCode).toEqual(404)
            expect(res.body.message).toEqual('User not found')
        })
        it('should return jwt malformed', async () => {
            const res = await request(app)
                .get('/api/users/' + '6491d77dcc63b60a0904ed2c')
                .set('Authorization', `Bearer token`)
            // console.log(res.status)
            // console.log(res.body)
            expect(res.statusCode).toEqual(401)
            expect(res.body.error).toEqual('jwt malformed')
        })
    })
    describe('PUT USER', () => {
        it('should update user data', async () => {
            const res = await request(app)
                .put('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    fullname: 'John Doe',
                    email: 'janedo@example.com',
                    password: 'password',
                    telephone: '085280328542',
                    birth_date: '1990-01-01'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('_id')
        })
    })
    describe('PUT USER', () => {
        it('should update user data', async () => {
            const res = await request(app)
                .put('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'janedo@example.com',
                    password: 'password',
                    telephone: '085280328542',
                    birth_date: '1990-01-01'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('_id')
        })
    })
    describe('PUT USER', () => {
        it('should update user data', async () => {
            const res = await request(app)
                .put('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    fullname: 'John Doe',
                    password: 'password',
                    telephone: '085280328542',
                    birth_date: '1990-01-01'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('_id')
        })
    })
    describe('PUT USER', () => {
        it('should update user data', async () => {
            const res = await request(app)
                .put('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    fullname: 'John Doe',
                    email: 'janedo@example.com',
                    telephone: '085280328542',
                    birth_date: '1990-01-01'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('_id')
        })
    })
    describe('PUT USER', () => {
        it('should update user data', async () => {
            const res = await request(app)
                .put('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    fullname: 'John Doe',
                    email: 'janedo@example.com',
                    password: 'password',
                    birth_date: '1990-01-01'
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('_id')
        })
    })
    describe('PUT USER', () => {
        it('should update user data', async () => {
            const res = await request(app)
                .put('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    fullname: 'John Doe',
                    email: 'janedo@example.com',
                    password: 'password',
                    telephone: '085280328542',
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('_id')
        })
    })
    describe('Delete USER', () => {
        it('should return User deleted successfully', async () => {
            const res = await request(app)
                .delete('/api/users/' + idUser)
                .set('Authorization', `Bearer ${token}`)

            expect(res.body.message).toEqual('User deleted successfully')
            expect(res.status).toEqual(200)
        })
        it('should return User not found', async () => {
            const res = await request(app)
                .delete('/api/users/' + 'qweqweqweqw')
                .set('Authorization', `Bearer ${token}`)
            expect(res.body.error).toEqual('User not found')
            expect(res.status).toEqual(401)
        })
    })
})

describe('===============FLIGHT API TESTING', () => {
    describe('POST /api/flight/', () => {
        it('should return status code 201 and a flight object', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00.000Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00.000Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            flightId = response.body._id;
            expect(response.statusCode).toEqual(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.flightNumber).toEqual('AA123');
            expect(response.body.airline).toEqual('American Airlines');
            expect(response.body.departure).toHaveLength(1);
            expect(response.body.departure[0].departure_airport).toEqual('JFK');
            expect(response.body.departure[0].departure_city).toEqual('New York');
            expect(response.body.departure[0].departure_country).toEqual('USA');
            expect(response.body.departure[0].departure_date).toEqual('2021-08-01T10:00:00.000Z');
            expect(response.body.departure[0].departure_time).toEqual('10:00 AM');
            expect(response.body.arrival).toHaveLength(1);
            expect(response.body.arrival[0].arrival_airport).toEqual('LHR');
            expect(response.body.arrival[0].arrival_city).toEqual('London');
            expect(response.body.arrival[0].arrival_country).toEqual('UK');
            expect(response.body.arrival[0].arrival_date).toEqual('2021-08-02T14:00:00.000Z');
            expect(response.body.arrival[0].arrival_time).toEqual('2:00 PM');
            expect(response.body.price).toEqual(500);
            expect(response.body.seats).toEqual(200);
            expect(response.body.availableSeats).toEqual(100);
            expect(response.body.createdDate).toEqual('2021-07-01T10:00:00.000Z');
        });
        it('should return status code 500 Flight validation failed: flightNumber: Path `flightNumber` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({

                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00.000Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00.000Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00.000Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: airline: Path `airline` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00.000Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00.000Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00.000Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: departure.0.departure_airport: Path `departure_airport` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            //    "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00.000Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00.000Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00.000Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: departure.0.departure_city: Path `departure_city` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            // "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00.000Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00.000Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00.000Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: departure.0.departure_country: Path `departure_country` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            // "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: departure.0.departure_date: Path `departure_date` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            //"departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: departure.0.departure_time: Path `departure_time` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            //"departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: arrival.0.arrival_airport: Path `arrival_airport` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            //    "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: arrival.0.arrival_city: Path `arrival_city` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            // "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: arrival.0.arrival_country: Path `arrival_country` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            //"arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: arrival.0.arrival_date: Path `arrival_date` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            //"arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: arrival.0.arrival_time: Path `arrival_time` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            //"arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: price: Path `price` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    //  "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: seats: Path `seats` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    //   "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
        it('should return status code 500 Flight validation failed: availableSeats: Path `availableSeats` is required.', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    // "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.body);
            // console.log(response.status);
            // flightId = response.body._id;
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /api/flight/:id', () => {
        it('should return status error code 500', async () => {
            const response = await request(app)
                .get('/api/flight/' + flightId)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty('flightNumber');
        });
        it('should return status code 200 and a flight object', async () => {
            const response = await request(app)
                .get('/api/flight/' + "idNotValid")
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(response.status)
            // console.log(response.body)
            expect(response.statusCode).toEqual(500);
            expect(response.body.message).toEqual('Cast to ObjectId failed for value "idNotValid" (type string) at path "_id" for model "Flight"');
        });
    });

    describe('GET ALL /api/flight/', () => {
        it('should return status code 200 and an array of flights', async () => {
            const response = await request(app)
                .get('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).toEqual(200);
        });
    });


    // Testing for findFlightsByCities route
    describe('POST /api/flight/search', () => {
        it('should return status code 200 and an array of flights', async () => {
            const response = await request(app)
                .post('/api/flight/search')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ departureCity: 'New York', arrivalCity: 'London' });
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).toEqual(200);
        });
        it('should return [] not found', async () => {
            const response = await request(app)
                .post('/api/flight/search')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ departureCity: 'Jakarta' });
            // console.log(response.statusCode);
            // console.log(response.body.flights);
            expect(response.body.flights).toEqual([]);
        });
    });

    // // Testing for updateFlight route
    describe('PUT /api/flight/:id', () => {
        it('should return status code 200 and a updated flight object', async () => {
            const response = await request(app)
                .put(`/api/flight/${flightId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 100,
                    "seats": 100,
                    "availableSeats": 50,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty('_id')
        });
        it('should return status code 200 and a updated flight object', async () => {
            const response = await request(app)
                .put(`/api/flight/${flightId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    //    "flightNumber": "AB123",
                    "airline": "American Airlines Megajaya",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 100,
                    "seats": 100,
                    "availableSeats": 50,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty('_id')
        });
        it('should return status code 500 and a message Cast to ObjectId failed for value "notvalidid" (type string) at path "_id" for model "Flight"', async () => {
            const response = await request(app)
                .put(`/api/flight/notvalidid`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AB123",
                    "airline": "American Airlines Megajaya",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 100,
                    "seats": 100,
                    "availableSeats": 50,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message')
        });
    });

    describe('DELETE /api/flight/:id', () => {
        it('should return status code 200', async () => {
            const response = await request(app)
                .delete(`/api/flight/${flightId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).toEqual(200);
            expect(response.body.message).toEqual('Flight deleted');
        });
    });
    describe('DELETE /api/flight/:id', () => {
        it('should return status code 500 and a message Cast to ObjectId failed for value "notvalidid" (type string) at path "_id" for model "Flight"', async () => {
            const response = await request(app)
                .delete(`/api/flight/notvalidid`)
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(response.statusCode);
            // console.log(response.body);
            expect(response.statusCode).toEqual(500);
            expect(response.body).toHaveProperty('message');
        });
    });
})

describe('===============FLIGHT BOOKING API TESTING', () => {
    describe('POST /api/books-flight/', () => {
        it('should return status code 201 and a flight object', async () => {
            const response = await request(app)
                .post('/api/flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flightNumber": "AA123",
                    "airline": "American Airlines",
                    "departure": [
                        {
                            "departure_airport": "JFK",
                            "departure_city": "New York",
                            "departure_country": "USA",
                            "departure_date": "2021-08-01T10:00:00.000Z",
                            "departure_time": "10:00 AM"
                        }
                    ],
                    "arrival": [
                        {
                            "arrival_airport": "LHR",
                            "arrival_city": "London",
                            "arrival_country": "UK",
                            "arrival_date": "2021-08-02T14:00:00.000Z",
                            "arrival_time": "2:00 PM"
                        }
                    ],
                    "price": 500,
                    "seats": 200,
                    "availableSeats": 100,
                    "createdDate": "2021-07-01T10:00:00Z"
                });
            flightId = response.body._id;
        });
        it('should create a new booking', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": flightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vip",
                    "totalPrice": 5000000
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.flight).toEqual(flightId);
            expect(res.body.passengers).toHaveLength(2);
            expect(res.body.passengers[0].name).toEqual('John Doe');
            expect(res.body.passengers[0].age).toEqual(30);
            expect(res.body.passengers[0].gender).toEqual('Male');
            expect(res.body.passengers[1].name).toEqual('Jane Doe');
            expect(res.body.passengers[1].age).toEqual(28);
            expect(res.body.passengers[1].gender).toEqual('Female');
            expect(res.body.bookingType).toEqual('vip');
            expect(res.body.totalPrice).toEqual(5000000);
            bookingFlightId = res.body._id
        });
        it('should return status code 400 and message Booking_flight validation failed: flight: Path `flight` is required.', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vip",
                    "totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            // bookingFlightId = res.body._id
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
        it('should return 400 status code and message Booking_flight validation failed: bookingType: Path `bookingType` is required.', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": flightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    // "bookingType": "vip",
                    "totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
        it('should return 400 status code and message Booking_flight validation failed: totalPrice: Path `totalPrice` is required.', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": flightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vip",
                    //"totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
        it('should return 400 status code and message Booking_flight validation failed: passengers.0.name: Path `name` is required.', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": flightId,
                    "passengers": [
                        {
                            //    "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vip",
                    "totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
        it('should return 400 status code and message Booking_flight validation failed: passengers.0.age: Path `age` is required.', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": flightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            //      "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vip",
                    "totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
        it('should return 400 status code and message Booking_flight validation failed: passengers.0.gender: Path `gender` is required.', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": flightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            // "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vip",
                    "totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('GET /api/books-flight/', () => {
        it('should return all bookings', async () => {
            const res = await request(app)
                .get('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toHaveProperty('_id');
        });
    });

    describe('GET /api/books-flight/:id', () => {
        it('should return a booking by id', async () => {
            const res = await request(app)
                .get('/api/books-flight/' + bookingFlightId)
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
        });
        it('should return 500 status code', async () => {
            const res = await request(app)
                .get('/api/books-flight/tidakvalid')
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('PUT /api/books-flight/:id', () => {
        it('should update a booking by id', async () => {
            const res = await request(app)
                .put('/api/books-flight/' + bookingFlightId)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": bookingFlightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vvip",
                    "totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
        });
        it('should return 400 status code and a message Cast to ObjectId failed for value "notvalidid" (type string) at path "_id" for model "Booking_flight"', async () => {
            const res = await request(app)
                .put('/api/books-flight/notvalidid')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": bookingFlightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vvip",
                    "totalPrice": 5000000
                });
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('DELETE /api/books-flight/:id', () => {
        it('should delete a booking by id', async () => {
            const res = await request(app)
                .delete('/api/books-flight/' + bookingFlightId)
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Booking deleted');
        });
    });
    describe('DELETE /api/books-flight/:id', () => {
        it('should return 500 and message Cast to ObjectId failed for value "notvalidid" (type string) at path "_id" for model "Booking_flight"', async () => {
            const res = await request(app)
                .delete('/api/books-flight/notvalidid')
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(res.statusCode);
            // console.log(res.body);
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });
})

describe('===============Payment FLIGHT API TESTING', () => {
    describe('POST /api/books-flight/', () => {
        it('should create a new booking', async () => {
            const res = await request(app)
                .post('/api/books-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "flight": flightId,
                    "passengers": [
                        {
                            "name": "John Doe",
                            "age": 30,
                            "gender": "Male"
                        },
                        {
                            "name": "Jane Doe",
                            "age": 28,
                            "gender": "Female"
                        }
                    ],
                    "bookingType": "vip",
                    "totalPrice": 5000000
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.flight).toEqual(flightId);
            expect(res.body.passengers).toHaveLength(2);
            expect(res.body.passengers[0].name).toEqual('John Doe');
            expect(res.body.passengers[0].age).toEqual(30);
            expect(res.body.passengers[0].gender).toEqual('Male');
            expect(res.body.passengers[1].name).toEqual('Jane Doe');
            expect(res.body.passengers[1].age).toEqual(28);
            expect(res.body.passengers[1].gender).toEqual('Female');
            expect(res.body.bookingType).toEqual('vip');
            expect(res.body.totalPrice).toEqual(5000000);
            bookingFlightId = res.body._id

        });
    });
    describe('POST /api/payment-flight/', () => {
        it('should create a new payment with status code 201', async () => {
            const res = await request(app)
                .post('/api/payment-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "booking": bookingFlightId,
                    "paymentType": "transfer",
                    "proofPayment": "ss.png"
                });
            paymentFlightId = res.body._id
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            // console.log(res.statusCode, res.body);
        });
        it('should return 400 status code and a message Payment_flight validation failed: booking: Path `booking` is required.', async () => {
            const res = await request(app)
                .post('/api/payment-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    // "booking": bookingFlightId,
                    "paymentType": "transfer",
                    "proofPayment": "ss.png"
                });
            // paymentFlightId = res.body._id
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            //console.log(res.statusCode, res.body);
        });
        it('should return 400 status code and a message Payment_flight validation failed: proofPayment: Path `proofPayment` is required.', async () => {
            const res = await request(app)
                .post('/api/payment-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "booking": bookingFlightId,
                    "paymentType": "transfer",
                    //"proofPayment":"ss.png"
                });
            // paymentFlightId = res.body._id
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            // console.log(res.statusCode, res.body);
        });
        it('should return 201 created a payment.', async () => {
            const res = await request(app)
                .post('/api/payment-flight/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "booking": bookingFlightId,
                    //"paymentType": "transfer",
                    "proofPayment": "ss.png"
                });
            // paymentFlightId = res.body._id
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            // console.log(res.statusCode, res.body);
        });
    });

    describe('GET /api/payment-flight/:id', () => {
        it('should return a payment with status code 200', async () => {
            const res = await request(app)
                .get('/api/payment-flight/' + paymentFlightId)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
            // console.log(res.statusCode, res.body);
        });
        it('should return a payment with status code 200', async () => {
            const res = await request(app)
                .get('/api/payment-flight/notValidIdPayment')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(500);
            expect(res.body.message).toEqual('Cast to ObjectId failed for value "notValidIdPayment" (type string) at path "_id" for model "Payment_flight"');
            // console.log(res.statusCode, res.body);
        });
    });
    describe('GET /api/payment-flight/', () => {
        it('should return all payments with status code 200', async () => {
            const res = await request(app)
                .get('/api/payment-flight/')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            // console.log(res.statusCode, res.body);
        });
    });
    describe('PUT /api/payment-flight/:id', () => {
        it('should update status payment', async () => {
            const res = await request(app)
                .put('/api/payment-flight/' + paymentFlightId)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "paymentStatus": "paid",
                    "paymentType": "transfer"
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Payment confirmed');
            // console.log(res.statusCode, res.body);
        });
        it('should return status code 400 and a message Cast to ObjectId failed for value "notvalidid" (type string) at path "_id" for model "Payment_flight"', async () => {
            const res = await request(app)
                .put('/api/payment-flight/notvalidid')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "paymentStatus": "paid",
                    "paymentType": "transfer"
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
            //  console.log(res.statusCode, res.body);
        });
    });

    describe('DELETE /api/payment-flight/:id', () => {
        it('should delete a payment with status code 204', async () => {
            const res = await request(app)
                .delete('/api/payment-flight/' + paymentFlightId)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Payment deleted');
            //console.log(res.statusCode, res.body);
        });
        it('should return 500 status code and a message Cast to ObjectId failed for value "notvalidid" (type string) at path "_id" for model "Payment_flight"', async () => {
            const res = await request(app)
                .delete('/api/payment-flight/notvalidid')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
            // console.log(res.statusCode, res.body);
        });
    });
})


describe('===============HOTELS API TESTING', () => {
    describe('POST /api/hotels/', () => {

        it('should create a new hotel', async () => {
            const res = await request(app)
                .post('/api/hotels/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelName": "Hilton",
                    "city": "New York",
                    "address": "123 Main St.",
                    "pictureHotelPath": "/images/hilton-hotel.jpg",
                    "stars": 5,
                    "facilities": [
                        "Swimming pool",
                        "Gym",
                        "Spa"
                    ],
                    "rooms": [
                        {
                            "roomType": "Deluxe",
                            "pictureRoomPath": "/images/deluxe-room.jpg",
                            "amount": 200,
                            "availableRooms": 10,
                            "facilities": [
                                "TV",
                                "WiFi",
                                "Mini bar"
                            ]
                        }
                    ]
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.hotelName).toEqual('Hilton');
            expect(res.body.city).toEqual('New York');
            expect(res.body.address).toEqual('123 Main St.');
            expect(res.body.pictureHotelPath).toEqual('/images/hilton-hotel.jpg');
            expect(res.body.stars).toEqual(5);
            expect(res.body.facilities).toEqual(['Swimming pool', 'Gym', 'Spa']);
            expect(res.body.rooms).toHaveLength(1);
            expect(res.body.rooms[0].roomType).toEqual('Deluxe');
            expect(res.body.rooms[0].pictureRoomPath).toEqual('/images/deluxe-room.jpg');
            expect(res.body.rooms[0].amount).toEqual(200);
            expect(res.body.rooms[0].availableRooms).toEqual(10);
            expect(res.body.rooms[0].facilities).toEqual(['TV', 'WiFi', 'Mini bar']);
            hotelsId = res.body._id
            roomsId = res.body.rooms[0]._id
            // console.log(res.status,res.body)
        });
    });


    describe('GET /api/hotels/', () => {
        it('should return all hotels', async () => {
            const res = await request(app)
                .get('/api/hotels/')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toHaveProperty('_id');
            //console.log(res.status,res.body)
        });
    });

    describe('GET /api/hotels/:id', () => {
        it('should return a hotel by ID', async () => {
            const res = await request(app)
                .get('/api/hotels/' + hotelsId)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
            //  console.log(res.status,res.body)
        });
        it('should return 500 status code and a message internal server error', async () => {
            const res = await request(app)
                .get('/api/hotels/notvalidid')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
            //console.log(res.status,res.body)
        });
    });

    describe('GET /api/hotels/search/:city', () => {
        it('should return hotels by city', async () => {
            const res = await request(app)
                .get('/api/hotels/search/New York')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body[0]).toHaveProperty('_id');
        });
        it('should return [] not found', async () => {
            const res = await request(app)
                .get('/api/hotels/search/Jakarta')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual([]);
        });
    });

    describe('PUT /api/hotels/:id', () => {
        it('should update a hotel by ID', async () => {
            const res = await request(app)
                .put('/api/hotels/' + hotelsId)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelName": "New Hilton",
                    "city": "New York City",
                    "address": "123 Main St.",
                    "pictureHotelPath": "/images/hilton-hotel.jpg",
                    "stars": 5,
                    "facilities": [
                        "Swimming pool",
                        "Gym",
                        "Spa"
                    ],
                    "rooms": [
                        {
                            "roomType": "Deluxe",
                            "pictureRoomPath": "/images/deluxe-room.jpg",
                            "amount": 200,
                            "availableRooms": 10,
                            "facilities": [
                                "TV",
                                "WiFi",
                                "Mini bar"
                            ]
                        }
                    ]
                });

            // console.log(res.status,res.body)
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
        });
        it('should return 500 and a message internal server error', async () => {
            const res = await request(app)
                .put('/api/hotels/notvalidid')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelName": "New Hilton",
                    "city": "New York City",
                    "address": "123 Main St.",
                    "pictureHotelPath": "/images/hilton-hotel.jpg",
                    "stars": 5,
                    "facilities": [
                        "Swimming pool",
                        "Gym",
                        "Spa"
                    ],
                    "rooms": [
                        {
                            "roomType": "Deluxe",
                            "pictureRoomPath": "/images/deluxe-room.jpg",
                            "amount": 200,
                            "availableRooms": 10,
                            "facilities": [
                                "TV",
                                "WiFi",
                                "Mini bar"
                            ]
                        }
                    ]
                });
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('DELETE /api/hotels/:id', () => {
        it('should delete a hotel by ID', async () => {
            const res = await request(app)
                .delete('/api/hotels/' + hotelsId)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('_id');
        });
        it('should return status code 404 and a message hotel not found', async () => {
            const res = await request(app)
                .delete('/api/hotels/' + hotelsId)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('message');
        });
    });
})

describe('===============ROOMS API TESTING', () => {
    describe('POST /api/hotels/:hotelId/rooms', () => {
        it('should create a new hotel', async () => {
            const res = await request(app)
                .post('/api/hotels/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelName": "Hilton",
                    "city": "New York",
                    "address": "123 Main St.",
                    "pictureHotelPath": "/images/hilton-hotel.jpg",
                    "stars": 5,
                    "facilities": [
                        "Swimming pool",
                        "Gym",
                        "Spa"
                    ],
                    "rooms": [
                        {
                            "roomType": "Deluxe",
                            "pictureRoomPath": "/images/deluxe-room.jpg",
                            "amount": 200,
                            "availableRooms": 10,
                            "facilities": [
                                "TV",
                                "WiFi",
                                "Mini bar"
                            ]
                        }
                    ]
                });
            hotelsId = res.body._id
            roomsId = res.body.rooms[0]._id
        });

        it('should add new room to hotel', async () => {
            const res = await request(app)
                .post(`/api/hotels/${hotelsId}/rooms/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "roomType": "Single",
                    "pictureRoomPath": "/images/single-room.jpg",
                    "amount": 200,
                    "availableRooms": 10,
                    "facilities": [
                        "TV",
                        "WiFi"
                    ]
                });
            // console.log(res.status,res.body);
            expect(res.statusCode).toEqual(200);
            expect(res.body.data.roomType).toEqual('Single');
            expect(res.body.data.pictureRoomPath).toEqual('/images/single-room.jpg');
            expect(res.body.data.amount).toEqual(200);
            expect(res.body.data.availableRooms).toEqual(10);
            expect(res.body.data.facilities).toEqual([
                "TV",
                "WiFi"
            ]);
        });
        it('should return 500 status code and error when roomType is not provided', async () => {
            const res = await request(app)
                .post(`/api/hotels/${hotelsId}/rooms/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "pictureRoomPath": "/images/single-room.jpg",
                    "amount": 200,
                    "availableRooms": 10,
                    "facilities": [
                        "TV",
                        "WiFi"
                    ]
                });
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 500 status code and error when pictureRoomPath is not provided', async () => {
            const res = await request(app)
                .post(`/api/hotels/${hotelsId}/rooms/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "roomType": "Single",
                    "amount": 200,
                    "availableRooms": 10,
                    "facilities": [
                        "TV",
                        "WiFi"
                    ]
                });
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 500 status code and error when amount is not provided', async () => {
            const res = await request(app)
                .post(`/api/hotels/${hotelsId}/rooms/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "roomType": "Single",
                    "pictureRoomPath": "/images/single-room.jpg",
                    "availableRooms": 10,
                    "facilities": [
                        "TV",
                        "WiFi"
                    ]
                });

            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 500 status code and error when availableRooms is not provided', async () => {
            const res = await request(app)
                .post(`/api/hotels/${hotelsId}/rooms/`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "roomType": "Single",
                    "pictureRoomPath": "/images/single-room.jpg",
                    "amount": 200,
                    "facilities": [
                        "TV",
                        "WiFi"
                    ]
                });
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe(`GET /api/hotels/:hotelId/rooms`, () => {
        it('should get all rooms from hotel', async () => {
            const res = await request(app)
                .get(`/api/hotels/${hotelsId}/rooms/`)
                .set('Authorization', `Bearer ${adminToken}`)
            // console.log(res.body,res.status);
            expect(res.statusCode).toEqual(200);
        });
    });

    describe('PUT /api/hotels/:hotelId/rooms/:roomId', () => {
        it('should update a rooms from a hotel', async () => {
            const res = await request(app)
                .put(`/api/hotels/${hotelsId}/rooms/${roomsId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "roomType": "Double Room",
                    "pictureRoomPath": "https://example.com/images/Double-room.jpg",
                    "amount": 1000000,
                    "availableRooms": 20,
                    "facilities": [
                        "AC",
                        "TV",
                        "Hot Water",
                        "Free Wi-Fi"
                    ]
                })
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toHaveProperty('_id');
        });
    })

    describe('Delete /api/hotels/:hotelId/rooms/:roomId', () => {
        it('should delete a rooms from a hotel', async () => {
            const res = await request(app)
                .delete(`/api/hotels/${hotelsId}/rooms/${roomsId}`)
                .set('Authorization', `Bearer ${adminToken}`)
            // console.log(res.body, res.status);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
        });
        it('should return 401 if not authenticated as admin', async () => {
            const res = await request(app)
                .delete(`/api/hotels/${hotelsId}/rooms/${roomsId}`)
                .set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(401);
        });

        it('should return 500 if hotel not found', async () => {
            const res = await request(app)
                .delete(`/api/hotels/invalidId/rooms/${roomsId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(500);
        });

        it('should return 404 if room not found', async () => {
            const res = await request(app)
                .delete(`/api/hotels/${hotelsId}/rooms/invalidId`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(404);
        });
    })
})
describe('===============BOOKING HOTELS API TESTING', () => {

    describe('POST /api/hotels/:hotelId/rooms', () => {
        it('should create a new hotel', async () => {
            const res = await request(app)
                .post('/api/hotels/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelName": "Hilton",
                    "city": "New York",
                    "address": "123 Main St.",
                    "pictureHotelPath": "/images/hilton-hotel.jpg",
                    "stars": 5,
                    "facilities": [
                        "Swimming pool",
                        "Gym",
                        "Spa"
                    ],
                    "rooms": [
                        {
                            "roomType": "Deluxe",
                            "pictureRoomPath": "/images/deluxe-room.jpg",
                            "amount": 200,
                            "availableRooms": 10,
                            "facilities": [
                                "TV",
                                "WiFi",
                                "Mini bar"
                            ]
                        }
                    ]
                });
            hotelsId = res.body._id
            roomsId = res.body.rooms[0]._id
        });
    })
    describe('POST /api/book', () => {
        it('should return 401 if invalid request body', async () => {
            const res = await request(app)
                .post('/api/book')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    roomId: '123'
                });
            expect(res.statusCode).toEqual(401);
        });

        it('should return 201 if booking created successfully', async () => {
            const res = await request(app)
                .post('/api/book')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelId": hotelsId,
                    "roomId": roomsId,
                    "checkInDate": "2023-07-13T14:30:00.000Z",
                    "checkOutDate": "2023-07-14T10:00:00.000Z",
                    "guest": 2,
                    "totalPrice": 500,
                    "paymentStatus": "pending",
                    "customer": {
                        "name": "John Doe",
                        "email": "johndoe@example.com",
                        "phone": "+1-555-123-4567"
                    },
                    "createdAt": "2021-11-30T16:23:12.000Z",
                    "updatedAt": "2021-11-30T16:23:12.000Z"
                });
            // console.log(res.status,res.body)
            bookingHotelsId = res.body.data._id
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toHaveProperty('roomId');
            expect(res.body.data).toHaveProperty('hotelId');
            expect(res.body.data).toHaveProperty('guest');
            expect(res.body.data).toHaveProperty('totalPrice');
            expect(res.body.data).toHaveProperty('paymentStatus');
            expect(res.body.data).toHaveProperty('customer');
            expect(res.body.data).toHaveProperty('checkInDate');
            expect(res.body.data).toHaveProperty('checkOutDate');
        });
        it('should return 400 if hotel or room id is invalid', async () => {
            const res = await request(app)
                .post('/api/book')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelId": "invalidId",
                    "roomId": "invalidId",
                    "checkInDate": "2021-12-01T14:30:00.000Z",
                    "checkOutDate": "2021-12-05T10:00:00.000Z",
                    "guest": 2,
                    "totalPrice": 500,
                    "paymentStatus": "pending",
                    "customer": {
                        "name": "John Doe",
                        "email": "johndoe@example.com",
                        "phone": "+1-555-123-4567"
                    },
                    "createdAt": "2021-11-30T16:23:12.000Z",
                    "updatedAt": "2021-11-30T16:23:12.000Z"
                });
            //   console.log(res.status,res.body)
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        })
    });

    // // Test GET /api/book/:id
    describe('GET /api/book/:id', () => {
        it('should return 401 if no token provided', async () => {
            const res = await request(app).get('/api/book/1');
            expect(res.statusCode).toEqual(401);
        });

        it('should return 500 if booking not found', async () => {
            const res = await request(app)
                .get('/api/book/999')
                .set('Authorization', `Bearer ${adminToken}`);
            //   console.log(res.status,res.body)
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });

        it('should return 200 if booking found', async () => {
            const res = await request(app)
                .get('/api/book/' + bookingHotelsId)
                .set('Authorization', `Bearer ${adminToken}`);
            //   console.log(res.status,res.body)
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('roomId');
            expect(res.body).toHaveProperty('checkInDate');
            expect(res.body).toHaveProperty('checkOutDate');
        });

        it('should return 200 and an array of bookings', async () => {
            const res = await request(app)
                .get('/api/book')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    // Test PUT /api/book/:id
    describe('PUT /api/book/:id', () => {
        it('should return 401 if no token provided', async () => {
            const res = await request(app)
                .put('/api/book/' + bookingHotelsId)
                .send({
                    "hotelId": hotelsId,
                    "roomId": roomsId,
                    "checkInDate": "2023-07-15T14:30:00.000Z",
                    "checkOutDate": "2023-07-15T10:00:00.000Z",
                    "guest": 2,
                    "totalPrice": 500,
                    "paymentStatus": "paid",
                    "customer": {
                        "name": "JANE DOE",
                        "email": "johndoe@example.com",
                        "phone": "+1-555-123-4567"
                    },
                    "createdAt": "2021-11-30T16:23:12.000Z",
                    "updatedAt": "2021-11-30T16:23:12.000Z"
                });
            expect(res.statusCode).toEqual(401);
        });

        it('should return 200 if booking updated successfully', async () => {
            const res = await request(app)
                .put('/api/book/' + bookingHotelsId)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelId": hotelsId,
                    "roomId": roomsId,
                    "checkInDate": "2023-12-01T14:30:00.000Z",
                    "checkOutDate": "2023-12-05T10:00:00.000Z",
                    "guest": 2,
                    "totalPrice": 500,
                    "paymentStatus": "pending",
                    "customer": {
                        "name": "JANE DOE",
                        "email": "johndoe@example.com",
                        "phone": "+1-555-123-4567"
                    },
                    "createdAt": "2021-11-30T16:23:12.000Z",
                    "updatedAt": "2021-11-30T16:23:12.000Z"
                });
            //   console.log(res.body)
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('DELETE /api/book/:id', () => {
        it('should return 401 if no token provided', async () => {
            const res = await request(app).delete('/api/book/1');
            expect(res.statusCode).toEqual(401);
        });

        it('should return 500 if booking not found', async () => {
            const res = await request(app)
                .delete('/api/book/999')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(500);
        });

        it('should return 200 if booking deleted successfully', async () => {
            const res = await request(app)
                .delete('/api/book/' + bookingHotelsId)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
        });
    })
})

describe('===============PAYMENT BOOKING HOTELS API TESTING', () => {
    describe('POST /api/payment/', () => {
        it('should create a new payment', async () => {
            const res = await request(app)
                .post('/api/payment/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "bookingId": bookingHotelsId,
                    "paymentType": "transfer",
                    "proofPayment": "ss.png"
                });
            //console.log(res.status,res.body)
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toHaveProperty('_id');
            paymentId = res.body.data._id;
        });
        it('should return 400 status code and a error message cant find booking ID', async () => {
            const res = await request(app)
                .post('/api/payment/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "paymentType": "transfer",
                    "proofPayment": "ss.png"
                });
            // console.log(res.status,res.body)
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message');
        });
    });

    // Test get payment by id
    describe('GET /api/payment/:id', () => {
        it('should get payment by id', async () => {
            const res = await request(app)
                .get(`/api/payment/${paymentId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
        });
        it('should return a error message', async () => {
            const res = await request(app)
                .get(`/api/payment/notvalid`)
                .set('Authorization', `Bearer ${adminToken}`);
            // console.log(res.status,res.body)
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });

    // Test get all payments
    describe('GET /api/payment/', () => {
        it('should get all payments', async () => {
            const res = await request(app)
                .get('/api/payment/')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('payments');
            // console.log(res.body)
        });
    });

    // Test update payment
    describe('PUT /api/payment/:id', () => {
        it('should update payment', async () => {
            const res = await request(app)
                .put(`/api/payment/${paymentId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "paymentType": "lobby"
                });
            expect(res.statusCode).toEqual(200);
        });
        it('should update payment', async () => {
            const res = await request(app)
                .put(`/api/payment/notvalid`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "paymentType": "lobby"
                });
            // console.log(res.body, res.status);;
            // expect(res.statusCode).toEqual(400);
        });
    });

    // Test delete payment
    describe('DELETE /api/payment/:id', () => {
        it('should delete payment', async () => {
            const res = await request(app)
                .delete(`/api/payment/${paymentId}`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Pembayaran berhasil dihapus');
        });
        it('should return 500 error code and a message cant delete a payment', async () => {
            const res = await request(app)
                .delete(`/api/payment/novalidid`)
                .set('Authorization', `Bearer ${adminToken}`)
            // console.log(res.body, res.status);
            expect(res.statusCode).toEqual(500);
            expect(res.body).toHaveProperty('message');
        });
    });
    // Test confirm payment
    describe('PUT /api/confirm-payment/', () => {
        it('should create a new hotel', async () => {
            const res = await request(app)
                .post('/api/hotels/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelName": "Hilton",
                    "city": "New York",
                    "address": "123 Main St.",
                    "pictureHotelPath": "/images/hilton-hotel.jpg",
                    "stars": 5,
                    "facilities": [
                        "Swimming pool",
                        "Gym",
                        "Spa"
                    ],
                    "rooms": [
                        {
                            "roomType": "Deluxe",
                            "pictureRoomPath": "/images/deluxe-room.jpg",
                            "amount": 200,
                            "availableRooms": 10,
                            "facilities": [
                                "TV",
                                "WiFi",
                                "Mini bar"
                            ]
                        }
                    ]
                });
            hotelsId = res.body._id
            roomsId = res.body.rooms[0]._id
        });
        it('should return 201 if booking created successfully', async () => {
            const res = await request(app)
                .post('/api/book')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "hotelId": hotelsId,
                    "roomId": roomsId,
                    "checkInDate": "2023-07-13T14:30:00.000Z",
                    "checkOutDate": "2023-07-14T10:00:00.000Z",
                    "guest": 2,
                    "totalPrice": 500,
                    "paymentStatus": "pending",
                    "customer": {
                        "name": "John Doe",
                        "email": "johndoe@example.com",
                        "phone": "+1-555-123-4567"
                    },
                    "createdAt": "2021-11-30T16:23:12.000Z",
                    "updatedAt": "2021-11-30T16:23:12.000Z"
                });
            // console.log(res.status,res.body)
            bookingHotelsId = res.body.data._id
            expect(res.statusCode).toEqual(200);
        });
        it('should create a new payment', async () => {
            const res = await request(app)
                .post('/api/payment/')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "bookingId": bookingHotelsId,
                    "paymentType": "transfer",
                    "proofPayment": "ss.png"
                });
            //console.log(res.status,res.body)
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toHaveProperty('_id');
            paymentHotelsId = res.body.data._id;
        //    console.log("payment",paymentHotelsId)
        });
        it('should confirm payment', async () => {
            const res = await request(app)
                .put('/api/confirm-payment/'+paymentHotelsId)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "paymentStatus": "paid",
                    "paymentType": "debit_online"
                  });
                //   console.log(paymentHotelsId)
            // console.log(res.body,res.status);
            expect(res.statusCode).toEqual(404);
            // expect(res.body.message).toEqual('Payment confirmed');
        });
        it('should return 404 status code and error a message Cast to ObjectId failed for value "notvalidid" (type string) at path "_id" for model "Booking_hotel', async () => {
            const res = await request(app)
                .put('/api/confirm-payment/notvalidid')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    "paymentStatus": "paid",
                    "paymentType": "debit_online"
                  });
            // console.log(res.body, res.status);
            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({})
        });
    });
});

describe('clearDatabase', () => {

    it('should clear the database', async () => {
        await deleteUser();
        await disconnect();
    });
});