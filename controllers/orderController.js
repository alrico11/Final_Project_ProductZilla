const Order = require('../models/order');

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const { total_tiket, total_price } = req.body;

        // Create new order
        const order = new Order({
            total_tiket,
            total_price
        });

        // Save order to database
        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        // Find all orders in the database
        const orders = await Order.find();

        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Find order by id
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // Update order status
        order.status = status;

        // Save updated order to database
        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};