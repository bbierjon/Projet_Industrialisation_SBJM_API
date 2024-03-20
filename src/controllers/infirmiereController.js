// src/controllers/infirmiereController.js
const {pool} = require('../config/dbConfig');

//Récupère toutes les infirmières
exports.getAllInfirmieres = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Infirmiere');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des infirmières', error: error.message });
    }
};

//Récupère une infirmière en fonction de son ID
exports.getInfirmiereById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Infirmiere WHERE numeroInfirmiere = ?', [req.params.id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l’infirmière', error: error.message });
    }
};

//Crée une infirmière
exports.createInfirmiere = async (req, res) => {
    const { nomInfirmiere, prenomInfirmiere, numeroService, numeroUtilisateur } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Infirmiere (nomInfirmiere, prenomInfirmiere, numeroService, numeroUtilisateur) VALUES (?, ?, ?, ?)',
            [nomInfirmiere, prenomInfirmiere, numeroService, numeroUtilisateur]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Infirmière créée avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'infirmière.', error: error.message });
    }
};

//Met à jour les informations d'une infirmière
exports.updateInfirmiere = async (req, res) => {
    const { nomInfirmiere, prenomInfirmiere, numeroService, numeroUtilisateur } = req.body;
    try {
        await pool.query('UPDATE Infirmiere SET nomInfirmiere = ?, prenomInfirmiere = ?, numeroService = ?, numeroUtilisateur = ? WHERE numeroInfirmiere = ?', [nomInfirmiere, prenomInfirmiere, numeroService, numeroUtilisateur, req.params.id]);
        res.status(200).json({ message: 'Infirmière mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l’infirmière', error: error.message });
    }
};

//Supprime une infirmière
exports.deleteInfirmiere = async (req, res) => {
    try {
        await pool.query('DELETE FROM Infirmiere WHERE numeroInfirmiere = ?', [req.params.id]);
        res.status(200).json({ message: 'Infirmière supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l’infirmière', error: error.message });
    }
};
