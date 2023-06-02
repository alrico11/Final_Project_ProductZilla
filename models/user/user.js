const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, required: true },
  telephone: { type: String, required: true },
  birth_date: { type: Date, required: true },
  gender: { type: Boolean, default: null },
  status_active: { type: Boolean, default: true },
  tokens: [tokenSchema] // tambahkan properti tokens
}, { timestamps: true });

// Hash password sebelum disimpan ke database
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

// Method untuk compare password
userSchema.methods.comparePassword = async function (password) {
  const user = this;

  return bcrypt.compare(password, user.password);
};

// Method untuk generate token
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Simpan token ke dalam database
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;