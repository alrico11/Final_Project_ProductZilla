const paymentController = require('../../../controllers/flight/paymentController');
const Payment = require('../../../models/flight/payment');
const Booking = require('../../../models/flight/booking');

jest.mock('../../../models/flight/payment');
jest.mock('../../../models/flight/booking');

describe('Payment Controller', () => {
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
    describe('getAllPayments', () => {
        it('should get all payments', async () => {
            const payments = [
                {
                    _id: '1',
                    booking: 'booking1',
                    amount: 100,
                    paymentType: 'credit',
                    proofPayment: 'proof1',
                },
                {
                    _id: '2',
                    booking: 'booking2',
                    amount: 200,
                    paymentType: 'debit',
                    proofPayment: 'proof2',
                },
            ];
            Payment.find.mockResolvedValue(payments);
            await paymentController.getAllPayments(req, res);
            // console.log(res.json.mock.calls)
            // expect(res.json.mock.calls[0][0]).toEqual(payments);
        });
    });

    describe('getPaymentById', () => {
        it('should get a payment by id', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
            };
            Payment.findById.mockResolvedValue(payment);
            req.params = { id: '1' };
            await paymentController.getPaymentById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return 404 when payment not found', async () => {
            Payment.findById.mockResolvedValue(null);
            req.params = { id: '1' };
            await paymentController.getPaymentById(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });

    describe('createPayment', () => {
        it('should create a new payment', async () => {
            const newPayment = {
                booking: 'booking1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
            };
            req.body = newPayment;
            const savedPayment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
            };
            Payment.mockReturnValue({
                save: jest.fn().mockResolvedValue(savedPayment),
            });
            await paymentController.createPayment(req, res);
            expect(res.json.mock.calls[0][0]).toEqual(savedPayment);
        });
    });

    describe('confirmPayment', () => {
        it('should confirm a payment', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
                paymentStatus: 'unpaid',
            };
            Payment.findOne.mockResolvedValue(payment);
            req.body = {
                bookingId: 'booking1',
                proofPayment: 'proof1',
            };
            await paymentController.confirmPayment(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return 404 when payment not found', async () => {
            Payment.findOne.mockResolvedValue(null);
            req.body = {
                bookingId: 'booking1',
                proofPayment: 'proof1',
            };
            await paymentController.confirmPayment(req, res);
            expect(res.status.mock.calls[0][0]).toBe(404);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should call next with error', async () => {
            Payment.findOne.mockRejectedValue({ message: 'Error' });
            await paymentController.confirmPayment(req, res, jest.fn());
            // expect(res.send.mock.calls.length).toBe(0);
            // expect(res.status.mock.calls.length).toBe(0);
        });
    });

    describe('updatePayment', () => {
        it('should update an existing payment', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
                paymentStatus: 'unpaid',
            };
            const booking = {
                _id: 'booking1',
                paymentStatus: 'unpaid',
            };
            Payment.findById.mockResolvedValue(payment);
            Booking.findById.mockResolvedValue(booking);
            req.params = { id: '1' };
            await paymentController.updatePayment(req, res);
            //console.log(res.json.mock.calls)
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return 404 when payment not found', async () => {
            Payment.findById.mockResolvedValue(null);
            req.params = { id: '1' };
            await paymentController.updatePayment(req, res);
            expect(res.status.mock.calls[0][0]).toBe(404);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return 400 when booking not found', async () => {
            Payment.findById.mockResolvedValue({});
            Booking.findById.mockResolvedValue(null);
            req.params = { id: '1' };
            await paymentController.updatePayment(req, res);
            expect(res.status.mock.calls[0][0]).toBe(400);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return 400 when there is an error', async () => {
            Payment.findById.mockRejectedValue({ message: 'Error' });
            req.params = { id: '1' };
            await paymentController.updatePayment(req, res);
            expect(res.status.mock.calls[0][0]).toBe(400);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });

    describe('deletePayment', () => {
        it('should delete a payment', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
                paymentStatus: 'unpaid',
            };
            Payment.findById.mockResolvedValue(payment);
            req.params = { id: '1' };
            await paymentController.deletePayment(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should return 404 when payment not found', async () => {
            Payment.findById.mockResolvedValue(null);
            req.params = { id: '1' };
            await paymentController.deletePayment(req, res);
            expect(res.status.mock.calls[0][0]).toBe(404);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
        it('should call next with error', async () => {
            Payment.findById.mockRejectedValue({ message: 'Error' });
            req.params = { id: '1' };
            await paymentController.deletePayment(req, res, jest.fn());
            expect(res.send.mock.calls.length).toBe(0);
            expect(res.status.mock.calls.length).toBe(1);
        });
    });
});