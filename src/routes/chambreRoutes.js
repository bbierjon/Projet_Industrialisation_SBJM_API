// src/routes/chambreRoutes.js
const express = require('express');
const router = express.Router();
const chambreController = require('../controllers/chambreController');
const litController = require('../controllers/litController')

// Route pour obtenir toutes les chambres
router.get('/', chambreController.getAllChambres);

// Route pour obtenir une chambre par son ID
router.get('/:id', chambreController.getChambreById);

// Route pour créer une nouvelle chambre
router.post('/', chambreController.createChambre);

// Route pour mettre à jour une chambre
router.put('/:id', chambreController.updateChambre);

// Route pour supprimer une chambre
router.delete('/:id', chambreController.deleteChambre);

router.get('/lits/:numeroChambre', litController.getBedByBedroomsId);

module.exports = router;
