const Order = require('../models/order');

// Create a new order
exports.createOrder = (req, res) => {
  const order = new Order({
    user: req.body.user,
    orderType: req.body.orderType,
    orderDetails: req.body.orderDetails,
    paymentMethod: req.body.paymentMethod,
    paymentDetails: req.body.paymentDetails
  });

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: 'Failed to create order'
      });
    }

    res.json(order);
  });
};

// Get all orders
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name email')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: 'Failed to load orders'
        });
      }

      res.json(orders);
    });
};

// Get a single order
exports.getOrder = (req, res) => {
  Order.findById(req.params.orderId)
    .populate('user', '_id name email')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: 'Failed to find order'
        });
      }

      res.json(order);
    });
};

// Update an order
exports.updateOrder = (req, res) => {
  Order.findByIdAndUpdate(
    req.params.orderId,
    { 
      $set: {
        paymentStatus: 'paid',
        paymentTransaction: req.body.paymentTransaction
      } 
    },
    { new: true, useFindAndModify: false },
    (err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: 'Failed to update order'
        });
      }

      res.json(order);
    }
  );
};

// Delete an order
exports.deleteOrder = (req, res) => {
  Order.findByIdAndRemove(req.params.orderId, (err, order) => {
    if (err || !order) {
      return res.status(400).json({
        error: 'Failed to delete order'
      });
    }

    res.json({
      message: 'Order deleted successfully'
    });
  });
};