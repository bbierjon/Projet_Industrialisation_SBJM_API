// src/controllers/serviceController.js
const {pool} = require('../config/dbConfig');

exports.getAllServices = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Service');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des services', error: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Service WHERE numeroService = ?', [req.params.id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du service', error: error.message });
    }
};

exports.createService = async (req, res) => {
    const { nomService } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Service (nomService) VALUES (?)',
            [nomService]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Service créé avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du Service', error: error.message });
    }
};


exports.updateService = async (req, res) => {
    const { nomService } = req.body;
    try {
        await pool.query('UPDATE Service SET nomService = ? WHERE numeroService = ?', [nomService, req.params.id]);
        res.status(200).json({ message: 'Service mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du service', error: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        await pool.query('DELETE FROM Service WHERE numeroService = ?', [req.params.id]);
        res.status(200).json({ message: 'Service supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du service', error: error.message });
    }
};
