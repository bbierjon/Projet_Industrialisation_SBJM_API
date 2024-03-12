// src/controllers/litController.js
const {pool} = require('../config/dbConfig');

exports.getAllLits = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Lit');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des lits', error: error.message });
    }
};

exports.getLitById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Lit WHERE numeroLit = ?', [req.params.id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du lit', error: error.message });
    }
};


exports.createLit = async (req, res) => {
    const { estVirtuel, estReserve, numeroChambre, numeroPatient } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Lit (estVirtuel, estReserve, numeroChambre, numeroPatient) VALUES (?, ?, ?, ?)',
            [estVirtuel, estReserve, numeroChambre, numeroPatient]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Lit créé avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du lit', error: error.message });
    }
};


exports.updateLit = async (req, res) => {
    const { estVirtuel, estReserve, numeroChambre, numeroPatient } = req.body;
    try {
        await pool.query('UPDATE Lit SET estVirtuel = ?, estReserve = ?, numeroChambre = ?, numeroPatient = ? WHERE numeroLit = ?', [estVirtuel, estReserve, numeroChambre, numeroPatient, req.params.id]);
        res.status(200).json({ message: 'Lit mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du lit', error: error.message });
    }
};

exports.deleteLit = async (req, res) => {
    try {
        await pool.query('DELETE FROM Lit WHERE numeroLit = ?', [req.params.id]);
        res.status(200).json({ message: 'Lit supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du lit', error: error.message });
    }
};

exports.getBedByBedroomsId = async (req, res) => {
    try {
        const { numeroChambre } = req.params;
        const result = await pool.query('SELECT * FROM Lit WHERE numeroChambre = ?', [numeroChambre]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des lits pour le service', error: error.message });
    }
};
