const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

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
app.use('/', hotelRoutes);
app.use('/', hotelBookingRoutes);


// const orderRoutes = require('./routes/orderRoutes');

// const flightRoutes = require('./routes/flightRoutes');
// const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
// const paymentTransactionRoutes = require('./routes/paymentTransactionRoutes');

// app.use('/', orderRoutes);

// app.use('/', flightRoutes);
// app.use('/', paymentMethodRoutes);
// app.use('/', paymentTransactionRoutes);


mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
