const PaymentMethod = require('../models/paymentMethod');

exports.getAllPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await PaymentMethod.find();
        res.status(200).json(paymentMethods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPaymentMethod = async (req, res) => {
    const paymentMethod = new PaymentMethod({
        name: req.body.name,
        description: req.body.description,
        billingNumber: req.body.billingNumber
    });

    try {
        const newPaymentMethod = await paymentMethod.save();
        res.status(201).json(newPaymentMethod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        paymentMethod.name = req.body.name;
        paymentMethod.description = req.body.description;
        paymentMethod.billingNumber = req.body.billingNumber;

        const updatedPaymentMethod = await paymentMethod.save();
        res.status(200).json(updatedPaymentMethod);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePaymentMethod = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findById(req.params.id);
        if (!paymentMethod) {
            return res.status(404).json({ message: 'Payment method not found' });
        }
        await paymentMethod.remove();
        res.status(200).json({ message: 'Payment method deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};