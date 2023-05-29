const mongoose = require('mongoose');
const uuid = require('uuid');

const userSchema = new mongoose.Schema({
    user_id: { type: String, default: uuid.v4, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    birth_date: { type: Date, required: true },
    gender: { type: Boolean, default: null },
    status_active: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;