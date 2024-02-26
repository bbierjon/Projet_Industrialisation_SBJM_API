// src/routes/infirmiereRoutes.js
const express = require('express');
const router = express.Router();
const infirmiereController = require('../controllers/infirmiereController');

// Route pour obtenir toutes les infirmières
router.get('/', infirmiereController.getAllInfirmieres);

// Route pour obtenir une infirmière par son ID
router.get('/:id', infirmiereController.getInfirmiereById);

// Route pour créer une nouvelle infirmière
router.post('/', infirmiereController.createInfirmiere);

// Route pour mettre à jour une infirmière
router.put('/:id', infirmiereController.updateInfirmiere);

// Route pour supprimer une infirmière
router.delete('/:id', infirmiereController.deleteInfirmiere);

module.exports = router;
