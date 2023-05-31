
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean,default: false},
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    birth_date: { type: Date, required: true },
    gender: { type: Boolean, default: null },
    status_active: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;