const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const  roomsRoutes = require('./routes/rooms_routes');
const flightRoutes = require('./routes/flightRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const orderRoutes= require('./routes/orderRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const reservationFlightRoutes = require('./routes/reservationFlightRoutes');
const reviewFlightRoutes = require('./routes/reviewFlightRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userFlightRoutes = require('./routes/userFlightroutes');

app.use(bodyParser.json());
app.use(cors());
app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', roomsRoutes);
app.use('/',flightRoutes);
app.use('/',hotelRoutes);
app.use('/',orderRoutes);
app.use('/',paymentsRoutes);
app.use('/',reservationFlightRoutes);
app.use('/',reviewFlightRoutes);
app.use('/',reviewRoutes);
app.use('/',bookingRoutes);
app.use('./',reservationRoutes);
app.use('./',userFlightRoutes);









mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});