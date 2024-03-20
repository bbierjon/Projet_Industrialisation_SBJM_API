// src/routes/utilisateurRoutes.js
const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

//Route pour récupérer les utilisateurs
router.get('/', utilisateurController.getAllUtilisateurs);

//Route pour créer un utilisateur
router.post('/', utilisateurController.createUtilisateur);

//Route pour récupérer un utilisateur
router.get('/:userId', utilisateurController.getUtilisateur);

//Route pour mettre à jour un utilisateur
router.put('/:userId', utilisateurController.updateUtilisateur);

//Route pour supprimer un utilisateur
router.delete('/:userId', utilisateurController.deleteUtilisateur);

module.exports = router;
