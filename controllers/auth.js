const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedtoken');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    // Cek apakah email dan password valid
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      // Cari user berdasarkan email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Cek apakah password cocok
      const isMatch = await user.comparePassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      if (!user.tokens) {
        user.tokens = [];
      }
      
      // Buat token untuk user
      const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  
      // Tambahkan token ke user
      user.tokens = user.tokens.concat({ token });
      await user.save();
  
      // Kirim token ke client beserta informasi isAdmin
      res.status(200)
      .set('Authorization', `Bearer ${token}`)
      .json({ 
           status:"User Login Successfully",
           token,
           isAdmin: user.isAdmin ,
           user: {
            _id: user._id,
            name: user.name,
            email: user.email
           }
       });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.logout = async (req, res) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authorization.replace('Bearer ', '');
  
    // Cek apakah token sudah di-blacklist
    const blacklistedToken = await BlacklistedToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: 'Expired Token' });
    }
  
    // Tambahkan token ke dalam database
    const newBlacklistedToken = new BlacklistedToken({ token });
    await newBlacklistedToken.save();
  
    res.status(200).json({ message: 'Logout successful' });
  };