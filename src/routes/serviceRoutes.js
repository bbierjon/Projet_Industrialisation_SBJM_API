// src/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const chambreController = require('../controllers/chambreController')

// Route pour obtenir tous les services
router.get('/', serviceController.getAllServices);

// Route pour obtenir un service par son ID
router.get('/:id', serviceController.getServiceById);

// Route pour créer un nouveau service
router.post('/', serviceController.createService);

// Route pour mettre à jour un service
router.put('/:id', serviceController.updateService);

// Route pour supprimer un service
router.delete('/:id', serviceController.deleteService);

router.get('/service/:numeroService', chambreController.getChambresByServiceId);

module.exports = router;
