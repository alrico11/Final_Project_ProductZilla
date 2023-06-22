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
    describe('createPayment', () => {
        it('should create a new payment', async () => {
            const booking = {
                _id: '1',
                name: 'John Doe',
                email: 'johndoe@example.com',
                flight: 'flight1',
                paymentStatus: 'unpaid',
            };
            Booking.findById.mockResolvedValue(booking);
            const payment = {
                _id: '1',
                booking: '1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
            };
            Payment.mockReturnValue({
                save: jest.fn().mockResolvedValue(payment),
            });
            req.body = {
                bookingId: '1',
                paymentType: 'credit',
                proofPayment: 'proof1',
            };
            await paymentController.createPayment(req, res);
            // console.log(res.json.mock.calls)
            expect(res.json.mock.calls[0][0]).toEqual(payment);
        });

    
        it('should return error when there is an error during payment creation', async () => {
            const booking = {
                _id: '1',
                name: 'John Doe',
                email: 'johndoe@example.com',
                flight: 'flight1',
                paymentStatus: 'unpaid',
            };
            Booking.findById.mockResolvedValue(booking);
            const error = new Error('Error creating payment');
            Payment.mockReturnValue({
                save: jest.fn().mockRejectedValue(error),
            });
            req.body = {
                bookingId: '1',
                paymentType: 'lobby',
                proofPayment: 'proof1',
            };
            await paymentController.createPayment(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });

    describe('getPaymentById', () => {
        it('should get payment by id', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'lobby',
                proofPayment: 'proof1',
            };
            Payment.findById.mockResolvedValue(payment);
            req.params = {
                id: '1',
            };
            await paymentController.getPaymentById(req, res);
            // console.log(res.json.mock.calls)
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });

        it('should return error when payment not found', async () => {
            Payment.findById.mockResolvedValue(null);
            req.params = {
                id: '1',
            };
            await paymentController.getPaymentById(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            // console.log(res.json.mock.calls)
        });

    });

    describe('updatePayment', () => {
        it('should update payment', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'lobby',
                proofPayment: 'proof1',
                save: jest.fn().mockResolvedValue(),
            };
            Payment.findById.mockResolvedValue(payment);
            req.params = {
                id: '1',
            };
            req.body = {
                paymentType: 'debit_online',
            };
            await paymentController.updatePayment(req, res);
            // console.log(res.json.mock.calls)
             expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });

        });

        it('should return error when there is an error during payment update', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'lobby',
                proofPayment: 'proof1',
                save: jest.fn().mockRejectedValue(new Error('Error updating payment')),
            };
            Payment.findById.mockResolvedValue(payment);
            req.params = {
                id: '1',
            };
            req.body = {
                paymentType: 'debit',
            };
            await paymentController.updatePayment(req, res);
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
   
    describe('deletePayment', () => {
        it('should delete payment', async () => {
            const payment = {
                _id: '1',
                booking: 'booking1',
                amount: 100,
                paymentType: 'credit',
                proofPayment: 'proof1',
                populate: jest.fn().mockResolvedValue(),
                remove: jest.fn().mockResolvedValue(),
            };
            Payment.findByIdAndDelete.mockResolvedValue(payment);
            req.params = {
                id: '1',
            };
            await paymentController.deletePayment(req, res);
            // console.log(res.json.mock.calls)
             expect(res.json.mock.calls[0][0]).toHaveProperty('message');
            // expect(Payment.findByIdAndDelete).toHaveBeenCalledWith('1');
            // expect(res.status).toHaveBeenCalledWith(200);
            // expect(res.json).toHaveBeenCalledWith({
            //     message: 'Pembayaran berhasil dihapus',
            // });
        });

        it('should return error when payment not found', async () => {
            Payment.findByIdAndDelete.mockResolvedValue(null);
            req.params = {
                id: '1',
            };
            await paymentController.deletePayment(req, res);
            // console.log(res.json.mock.calls)
             expect(res.json.mock.calls[0][0]).toHaveProperty('message');
 
        });

        it('should return error when there is an error during payment deletion', async () => {
            const error = new Error('Error deleting payment');
            Payment.findByIdAndDelete.mockRejectedValue(error);
            req.params = {
                id: '1',
            };
            await paymentController.deletePayment(req, res);
            // console.log(res.json.mock.calls)
            expect(res.json.mock.calls[0][0]).toHaveProperty('message');
        });
    });
});
