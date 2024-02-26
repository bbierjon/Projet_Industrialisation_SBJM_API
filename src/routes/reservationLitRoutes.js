// src/routes/reservationLitRoutes.js
const express = require('express');
const router = express.Router();
const reservationLitController = require('../controllers/reservationLitController');

// Route pour obtenir toutes les réservations
router.get('/', reservationLitController.getAllReservations);

// Route pour obtenir une réservation par son ID
router.get('/:id', reservationLitController.getReservationById);

// Route pour créer une nouvelle réservation
router.post('/', reservationLitController.createReservation);

// Route pour mettre à jour une réservation
router.put('/:id', reservationLitController.updateReservation);

// Route pour supprimer une réservation
router.delete('/:id', reservationLitController.deleteReservation);

module.exports = router;
