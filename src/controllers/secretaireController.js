// src/controllers/secretaireController.js
const {pool} = require('../config/dbConfig');

exports.getAllSecretaires = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Secretaire');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des secrétaires', error: error.message });
    }
};

exports.getSecretaireById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Secretaire WHERE numeroSecretaire = ?', [req.params.id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la secrétaire', error: error.message });
    }
};

/*
exports.createSecretaire = async (req, res) => {
    const { nomSecretaire, prenomSecretaire, numeroUtilisateur } = req.body;
    try {
        const result = await pool.query('INSERT INTO Secretaire (nomSecretaire, prenomSecretaire, numeroUtilisateur) VALUES (?, ?, ?)', [nomSecretaire, prenomSecretaire, numeroUtilisateur]);
        res.status(201).json({ message: 'Secrétaire créée avec succès', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la secrétaire', error: error.message });
    }
};
*/

exports.createSecretaire = async (req, res) => {
    const { nomSecretaire, prenomSecretaire, numeroUtilisateur } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Secretaire (nomSecretaire, prenomSecretaire, numeroUtilisateur) VALUES (?, ?, ?)',
            [nomSecretaire, prenomSecretaire, numeroUtilisateur]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Secretaire créé(e) avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du secretaire', error: error.message });
    }
};




exports.updateSecretaire = async (req, res) => {
    const { nomSecretaire, prenomSecretaire, numeroUtilisateur } = req.body;
    try {
        await pool.query('UPDATE Secretaire SET nomSecretaire = ?, prenomSecretaire = ?, numeroUtilisateur = ? WHERE numeroSecretaire = ?', [nomSecretaire, prenomSecretaire, numeroUtilisateur, req.params.id]);
        res.status(200).json({ message: 'Secrétaire mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la secrétaire', error: error.message });
    }
};

exports.deleteSecretaire = async (req, res) => {
    try {
        await pool.query('DELETE FROM Secretaire WHERE numeroSecretaire = ?', [req.params.id]);
        res.status(200).json({ message: 'Secrétaire supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la secrétaire', error: error.message });
    }
};
