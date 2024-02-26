// src/routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Route pour obtenir tous les patients
router.get('/', patientController.getAllPatients);

// Route pour obtenir un patient par son ID
router.get('/:id', patientController.getPatientById);

// Route pour créer un nouveau patient
router.post('/', patientController.createPatient);

// Route pour mettre à jour un patient
router.put('/:id', patientController.updatePatient);

// Route pour supprimer un patient
router.delete('/:id', patientController.deletePatient);


module.exports = router;
