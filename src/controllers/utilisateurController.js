// src/controllers/utilisateurController.js
const {pool} = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAllUtilisateur = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Utilisateur');
        res.status(200).json(result);
    } catch (error) {
        console.error(error); // Ajoutez cette ligne pour imprimer l'erreur dans la console
        res.status(500).json({ message: 'Erreur lors de la récupération des patients', error: error.message });
    }
};


exports.createUtilisateur = async (req, res) => {
    const { identifiant, motDePasse, estSuperUtilisateur } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);

        const result = await pool.query(
            'INSERT INTO Utilisateur (identifiant, motDePasse, estSuperUtilisateur) VALUES (?, ?, ?)',
            [identifiant, hashedPassword , estSuperUtilisateur]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Utilisateur créé avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'Utilisateur', error: error.message });
    }
};



exports.getUtilisateur = async (req, res) => {
    let { userId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Utilisateur WHERE numeroUtilisateur = ?', [userId]);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la récupération de l’utilisateur', error });
    }
};

exports.updateUtilisateur = async (req, res) => {
    let { userId } = req.params;
    let { identifiant, motDePasse, estSuperUtilisateur } = req.body;
    try {
        await pool.query(
            'UPDATE Utilisateur SET identifiant = ?, motDePasse = ?, estSuperUtilisateur = ? WHERE numeroUtilisateur = ?',
            [identifiant, motDePasse, estSuperUtilisateur, userId]
        );
        res.status(200).send({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
    }
};

exports.deleteUtilisateur = async (req, res) => {
    let { userId } = req.params;
    try {
        await pool.query('DELETE FROM Utilisateur WHERE numeroUtilisateur = ?', [userId]);
        res.status(200).send({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la suppression de l’utilisateur', error });
    }
};


