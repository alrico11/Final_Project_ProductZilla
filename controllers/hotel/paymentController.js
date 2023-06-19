const Payment = require('../../models/hotel/payment');
const Booking = require("../../models/hotel/booking")
exports.confirmPayment = async (req, res) => {
    try {
        const { bookingId, paymentType } = req.body;

        // Cek apakah booking dengan ID yang diminta ada di database
        const booking = await Booking.findById(bookingId).exec();
        if (!booking) {
            return res.status(400).json({ message: 'Booking tidak ditemukan' });
        }

        // Buat data pembayaran baru
        const payment = new Payment({
            bookingId,
            paymentType,
            proofPayment: req.body.proofPayment
        });
        await payment.save();

        // Update status pembayaran di booking
        await Booking.updateOne({ _id: bookingId }, { $set: { paymentStatus: 'paid' } }).exec();
        await Payment.updateOne({ _id: payment._id }, { $set: { status: 'paid' } }).exec();

        // Tampilkan seluruh data di payment berdasarkan ID yang telah dibuat
        const data = await Payment.findById(payment._id).populate('bookingId').exec();

        return res.status(200).json({ message: 'Payment received', data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

exports.createPayment = async (req, res) => {
    try {
        const { bookingId, paymentType } = req.body;

        // Cek apakah booking dengan ID yang diminta ada di database
        const booking = await Booking.findById(bookingId).exec();
        if (!booking) {
            return res.status(400).json({ message: 'Booking tidak ditemukan' });
        }

        // Buat data pembayaran baru
        const payment = new Payment({
            bookingId,
            paymentType,
            proofPayment: req.body.proofPayment
        });
        await payment.save();
        // Tampilkan seluruh data di payment berdasarkan ID yang telah dibuat
        const data = await Payment.findById(payment._id).populate('bookingId').exec();

        return res.status(200).json({ message: 'Your order has been received', data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}


exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('bookingId').exec();
        return res.status(200).json({ payments });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pembayaran' });
    }
}

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('bookingId').exec();
        if (!payment) {
            return res.status(400).json({ message: 'Pembayaran tidak ditemukan' });
        }
        return res.status(200).json({ payment });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data pembayaran' });
    }
}

exports.updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        payment.paymentType = req.body.paymentType;

        const updatedPayment = await payment.save();
        res.json(updatedPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id).populate('bookingId').exec();
        if (!payment) {
            return res.status(400).json({ message: 'Pembayaran tidak ditemukan' });
        }
        return res.status(200).json({ message: 'Pembayaran berhasil dihapus' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data pembayaran' });
    }
}