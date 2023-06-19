const Payment = require('../../models/flight/payment');
const Booking = require('../../models/flight/booking');
// Get all payments
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('booking');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single payment by id
exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('booking');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new payment
exports.createPayment = async (req, res) => {
    const payment = new Payment({
        booking: req.body.booking,
        amount: req.body.amount,
        paymentType: req.body.paymentType,
        proofPayment: req.body.proofPayment
    });

    try {
        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.confirmPayment = async (req, res, next) => {
    try {
        const payment = await Payment.findOne({ booking: req.body.bookingId });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        payment.paymentStatus = 'paid';
        payment.proofPayment = req.body.proofPayment;
        await payment.save();
        return res.status(200).json({ message: 'Payment confirmed' });
    } catch (error) {
        return next(error);
    }
};


// Update an existing payment
exports.updatePayment = async (req, res) => {

    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        payment.paymentStatus = 'paid';

        const booking = await Booking.findById(payment.booking);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        booking.paymentStatus = 'paid';
        await booking.save();
        return res.status(200).json({ message: 'Payment confirmed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        await payment.deleteOne();
        res.json({ message: 'Payment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};