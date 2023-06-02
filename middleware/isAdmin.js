
const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
  // Cek apakah ada token pada header Authorization
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access | no token' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Cek apakah user ada dan isAdmin true
    if (decoded && decoded.isAdmin) {
      req.user = decoded; // Simpan decoded user pada objek request
      next(); // User adalah admin, lanjutkan ke route selanjutnya
    } else {
      res.status(401).json({ message: 'Unauthorized access' }); // User bukan admin, kembalikan error
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access1' }); // Token tidak valid, kembalikan error
  }
};

module.exports = isAdmin;

//   const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const isAdmin = require('../middlewares/isAdmin');

// router.delete('/:id', isAdmin, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     await user.remove();
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;