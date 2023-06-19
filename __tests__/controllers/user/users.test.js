const { app } = require('../../../app');
const { disconnect } = require('../../../database');
const { deleteUser } = require('./clearDb')

const request = require('supertest');

let token = ""
let idUser = ""

afterAll(async () => {

    await disconnect();
})

beforeAll(async () => {
    await deleteUser();
})

describe('USER API', () => {
    describe('POST /api/users/', () => {
        it('should create a new user', async () => {
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
            
           // console.log(res.body)
            expect(res.statusCode).toBe(201);
        })
        it('should return 400 if request body is invalid', async () => {
            const res = await request(app)
                .post('/api/users/')
                .send({
                    fullname: 123
                });
            expect(res.statusCode).toBe(400);
        })

    })
    describe('LOGIN USERS', () => {
        it('should login users show token', async () => {
            const res = await request(app)
                .post('/api/login')
                .send({
                    email: 'johndoe@example.com',
                    password: 'password'
                })

            token = res.body.token
            //console.log(res.body)
            expect(res.statusCode).toEqual(200)

        })
        describe('GET USER', () => {
            it('should login users show token', async () => {
                const res = await request(app)
                    .post('/api/users/' + idUser)
                    .set('Authorization', `Bearer ${token}`)
                // expect(res.body).toHaveProperty('token')
             //   console.log(res.body)
            })
        })
    })
})
