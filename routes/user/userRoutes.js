const express = require('express');
const router = express.Router();
const userController = require('../../controllers/auth/userController');
const authMiddleware = require('../../middleware/authMiddleware');
const isAdmin = require('../../middleware/isAdmin');
//LOGIN
router.post('/api/users/', userController.createUser);
router.get('/api/users/', isAdmin, userController.getAllUsers);
router.get('/api/users/:id', authMiddleware, userController.getUserById);
router.put('/api/users/:id', authMiddleware, userController.updateUser);
router.delete('/api/users/:id', isAdmin, userController.deleteUser);

module.exports = router;