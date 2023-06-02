const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const roomRoutes = require('./routes/roomRoutes');
const flightRoutes = require('./routes/flightRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
const paymentTransactionRoutes = require('./routes/paymentTransactionRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use('/', userRoutes);
app.use('/', adminRoutes);
app.use('/', orderRoutes);
app.use('/', roomRoutes);
app.use('/', flightRoutes);
app.use('/', paymentMethodRoutes);
app.use('/', paymentTransactionRoutes);
app.use('/', authRoutes);

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