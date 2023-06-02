const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/auth');

router.post('/api/login', login);
router.post('/api/logout', logout);

module.exports = router;