const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const db = require('./database');



function server() {
    db.connect().catch(console.log);
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    const swaggerDocument = yaml.load(fs.readFileSync('./swagger/swagger.yaml', 'utf-8'))
    app.use('/admin/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //AUTH LOGIN LOGOUT
    const authRoutes = require('./routes/user/authRoutes');
    app.use('/', authRoutes);

    //USERS
    const userRoutes = require('./routes/user/userRoutes');
    const adminRoutes = require('./routes/user/adminRoutes');
    app.use('/', userRoutes);
    app.use('/', adminRoutes);

    //HOTEL
    const hotelRoutes = require('./routes/hotel/hotelRoutes');
    const hotelBookingRoutes = require('./routes/hotel/hotelBookingRoutes');
    const hotelPayments = require('./routes/hotel/paymentBooking');
    app.use('/', hotelRoutes);
    app.use('/', hotelBookingRoutes);
    app.use('/', hotelPayments);

    //TIKET PESAWAT
    const flightRoutes = require('./routes/flight/flightRoutes');
    const bookingRoutes = require('./routes/flight/bookingRoutes');
    const paymentRoutes = require('./routes/flight/paymentRoutes');
    app.use('/', flightRoutes);
    app.use('/', bookingRoutes);
    app.use('/', paymentRoutes);

    return app

}

module.exports = {
    server,
};
