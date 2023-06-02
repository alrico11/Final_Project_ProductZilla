const jwt = require('jsonwebtoken');
const User = require('../models/user/user');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid Authorization header');
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    // if (!user) {
    //   throw new Error('User not found');
    // }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message || 'Not authorized to access this resource' });
  }
};

module.exports = auth;