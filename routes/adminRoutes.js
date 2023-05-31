const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/api/admin/', adminController.createAdmin);
router.get('/api/admin/', adminController.getAllAdmins);
router.get('/api/admin/:id', adminController.getAdminById);
router.put('/api/admin/:id', adminController.updateAdmin);
router.delete('/api/admin/:id', adminController.deleteAdmin);

module.exports = router;
