// src/routes/equipementRoutes.js
const express = require('express');
const router = express.Router();
const equipementController = require('../controllers/equipementController');

// Route pour obtenir tous les équipements
router.get('/', equipementController.getAllEquipements);

// Route pour obtenir un équipement par son ID
router.get('/:id', equipementController.getEquipementById);

// Route pour créer un nouvel équipement
router.post('/', equipementController.createEquipement);

// Route pour mettre à jour un équipement
router.put('/:id', equipementController.updateEquipement);

// Route pour supprimer un équipement
router.delete('/:id', equipementController.deleteEquipement);

module.exports = router;
