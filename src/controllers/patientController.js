// src/controllers/patientController.js
const {pool} = require('../config/dbConfig');

exports.getAllPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Patient');
        res.status(200).json(result);
    } catch (error) {
        console.error(error); // Ajoutez cette ligne pour imprimer l'erreur dans la console
        res.status(500).json({ message: 'Erreur lors de la récupération des patients', error: error.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Patient WHERE numeroPatient = ?', [req.params.id]);
        if (result.length > 0) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Patient non trouvé' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du patient', error: error.message });
    }
};

exports.createPatient = async (req, res) => {
    const { nomPatient, prenomPatient, numeroCarteVitale, numeroChambre, numeroUtilisateur } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Patient (nomPatient, prenomPatient, numeroCarteVitale, numeroChambre, numeroUtilisateur) VALUES (?, ?, ?, ?, ?)',
            [nomPatient, prenomPatient, numeroCarteVitale, numeroChambre, numeroUtilisateur]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Patient créé avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du patient', error: error.message });
    }
};



exports.updatePatient = async (req, res) => {
    const { nomPatient, prenomPatient, numeroCarteVitale, numeroChambre, numeroUtilisateur } = req.body;
    try {
        await pool.query('UPDATE Patient SET nomPatient = ?, prenomPatient = ?, numeroCarteVitale = ?, numeroChambre = ?, numeroUtilisateur = ? WHERE numeroPatient = ?', [nomPatient, prenomPatient, numeroCarteVitale, numeroChambre, numeroUtilisateur, req.params.id]);
        res.status(200).json({ message: 'Patient mis à jour avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du patient', error: error.message });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        await pool.query('DELETE FROM Patient WHERE numeroPatient = ?', [req.params.id]);
        res.status(200).json({ message: 'Patient supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du patient', error: error.message });
    }
};
