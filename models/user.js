const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    birth_date: { type: Date, required: true },
    gender: { type: Boolean, default: null },
    status_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    modified_at: { type: Date, default: null }
});

const User = mongoose.model('User', userSchema);
module.exports = User;