// src/controllers/equipementController.js
const {pool} = require('../config/dbConfig');

//Récupère tous les types d'équipements
exports.getAllEquipements = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Equipement');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des équipements', error: error.message });
    }
};

//Récupère un équipement via son ID
exports.getEquipementById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Equipement WHERE numeroEquipement = ?', [req.params.id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l’équipement', error: error.message });
    }
};

//Crée un nouvel équipement
exports.createEquipement = async (req, res) => {
    const { nomEquipement, numeroService } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Equipement (nomEquipement, numeroService) VALUES (?, ?)',
            [nomEquipement, numeroService]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Equimement créé avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'equipement', error: error.message });
    }
};

//Met à jour les informations d'un équipement
exports.updateEquipement = async (req, res) => {
    const { nomEquipement, numeroService } = req.body;
    try {
        await pool.query('UPDATE Equipement SET nomEquipement = ?, numeroService = ? WHERE numeroEquipement = ?', [nomEquipement, numeroService, req.params.id]);
        res.status(200).json({ message: 'Équipement mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l’équipement', error: error.message });
    }
};

//Supprime un équipement
exports.deleteEquipement = async (req, res) => {
    try {
        await pool.query('DELETE FROM Equipement WHERE numeroEquipement = ?', [req.params.id]);
        res.status(200).json({ message: 'Équipement supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l’équipement', error: error.message });
    }
};
