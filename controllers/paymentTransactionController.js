
const PaymentTransaction = require('../models/paymentTransaction');

exports.getAllPaymentTransactions = async (req, res) => {
    try {
        const paymentTransactions = await PaymentTransaction.find().populate('user order paymentMethod');
        res.status(200).json(paymentTransactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPaymentTransactionById = async (req, res) => {
    try {
        const paymentTransaction = await PaymentTransaction.findById(req.params.id).populate('user order paymentMethod');
        if (!paymentTransaction) {
            return res.status(404).json({ message: 'Payment transaction not found' });
        }
        res.status(200).json(paymentTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPaymentTransaction = async (req, res) => {
    const paymentTransaction = new PaymentTransaction({
        user: req.body.user,
        order: req.body.order,
        paymentMethod: req.body.paymentMethod,
        amount: req.body.amount,
        transactionId: req.body.transactionId,
        status: req.body.status
    });

    try {
        const newPaymentTransaction = await paymentTransaction.save();
        res.status(201).json(newPaymentTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePaymentTransaction = async (req, res) => {
    try {
        const paymentTransaction = await PaymentTransaction.findById(req.params.id);
        if (!paymentTransaction) {
            return res.status(404).json({ message: 'Payment transaction not found' });
        }
        paymentTransaction.user = req.body.user;
        paymentTransaction.order = req.body.order;
        paymentTransaction.paymentMethod = req.body.paymentMethod;
        paymentTransaction.amount = req.body.amount;
        paymentTransaction.transactionId = req.body.transactionId;
        paymentTransaction.status = req.body.status;

        const updatedPaymentTransaction = await paymentTransaction.save();
        res.status(200).json(updatedPaymentTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePaymentTransaction = async (req, res) => {
    try {
        const paymentTransaction = await PaymentTransaction.findById(req.params.id);
        if (!paymentTransaction) {
            return res.status(404).json({ message: 'Payment transaction not found' });
        }
        await paymentTransaction.remove();
        res.status(200).json({ message: 'Payment transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};