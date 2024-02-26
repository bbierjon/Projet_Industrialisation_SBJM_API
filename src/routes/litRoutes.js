// src/routes/litRoutes.js
const express = require('express');
const router = express.Router();
const litController = require('../controllers/litController');

// Route pour obtenir tous les lits
router.get('/', litController.getAllLits);

// Route pour obtenir un lit par son ID
router.get('/:id', litController.getLitById);

// Route pour créer un nouveau lit
router.post('/', litController.createLit);

// Route pour mettre à jour un lit
router.put('/:id', litController.updateLit);

// Route pour supprimer un lit
router.delete('/:id', litController.deleteLit);

module.exports = router;
