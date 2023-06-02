const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/auth/adminController');
const auth = require('../../middleware/onlyAdmin')


router.post('/api/admin/', auth,adminController.createAdmin);
router.get('/api/admin/', auth,adminController.getAllAdmins);
router.get('/api/admin/:id', auth,adminController.getAdminById);
router.put('/api/admin/:id', auth,adminController.updateAdmin);
router.delete('/api/admin/:id', auth,adminController.deleteAdmin);

module.exports = router;
