// src/routes/utilisateurRoutes.js
const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

router.get('/', utilisateurController.getAllUtilisateur);

router.post('/', utilisateurController.createUtilisateur);

router.get('/:userId', utilisateurController.getUtilisateur);

router.put('/:userId', utilisateurController.updateUtilisateur);

router.delete('/:userId', utilisateurController.deleteUtilisateur);

module.exports = router;
