const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.createReservation);
router.get('/:reservationCode', reservationController.getReservationByCode);
router.delete('/:reservationId', reservationController.deleteReservation);

module.exports = router;