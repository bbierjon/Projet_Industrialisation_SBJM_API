const express = require('express');
const router = express.Router();
const secretaireController = require('../controllers/secretaireController');

// Route pour obtenir toutes les secrétaires
router.get('/', secretaireController.getAllSecretaires);

router.get('/:id', secretaireController.getSecretaireById);

// Route pour créer une nouvelle infirmière
router.post('/', secretaireController.createSecretaire);

// Route pour mettre à jour une infirmière
router.put('/:id', secretaireController.updateSecretaire);

// Route pour supprimer une infirmière
router.delete('/:id', secretaireController.deleteSecretaire);

module.exports = router;
