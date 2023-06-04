const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
try {
const { booking, paymentDate, amount, paymentMethod } = req.body;

const newPayment = new Payment({
  booking,
  paymentDate,
  amount,
  paymentMethod,
});

const savedPayment = await newPayment.save();

res.status(201).json(savedPayment);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.getAllPayments = async (req, res) => {
try {
const payments = await Payment.find();

res.status(200).json(payments);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.getPaymentById = async (req, res) => {
try {
const payment = await Payment.findById(req.params.id);

if (!payment) {
  res.status(404).json({ message: 'Payment not found' });
}

res.status(200).json(payment);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.updatePayment = async (req, res) => {
try {
const { booking, paymentDate, amount, paymentMethod } = req.body;

const updatedPayment = await Payment.findByIdAndUpdate(
  req.params.id,
  {
    booking,
    paymentDate,
    amount,
    paymentMethod,
  },
  { new: true }
);

if (!updatedPayment) {
  res.status(404).json({ message: 'Payment not found' });
}

res.status(200).json(updatedPayment);
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};

exports.deletePayment = async (req, res) => {
try {
const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

if (!deletedPayment) {
  res.status(404).json({ message: 'Payment not found' });
}

res.status(200).json({ message: 'Payment deleted successfully' });
} catch (error) {
console.error(error);
res.status(500).json({ message: 'Internal server error' });
}
};