// src/controllers/chambreController.js
const {pool} = require('../config/dbConfig');

//Récupère toutes les chambres
exports.getAllChambres = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Chambre');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des chambres', error: error.message });
    }
};

//Récupère une chambre en fonction de l'ID
exports.getChambreById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Chambre WHERE numeroChambre = ?', [req.params.id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la chambre', error: error.message });
    }
};

/*exports.createChambre = async (req, res) => {
    const { numeroService, numeroEquipement } = req.body;
    try {
        const result = await pool.query('INSERT INTO Chambre (numeroService, numeroEquipement) VALUES (?, ?)', [numeroService, numeroEquipement]);
        res.status(201).json({ message: 'Chambre créée avec succès', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la chambre', error: error.message });
    }
};*/

//Crée une nouvelle chambre
exports.createChambre = async (req, res) => {
    const { numeroService, numeroEquipement } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Chambre (numeroService, numeroEquipement) VALUES (?, ?)',
            [numeroService, numeroEquipement]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Chambre créée avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la chambre', error: error.message });
    }
};

//Met à jour les informations d'une chambre
exports.updateChambre = async (req, res) => {
    const { numeroService, numeroEquipement } = req.body;
    try {
        await pool.query('UPDATE Chambre SET numeroService = ?, numeroEquipement = ? WHERE numeroChambre = ?', [numeroService, numeroEquipement, req.params.id]);
        res.status(200).json({ message: 'Chambre mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la chambre', error: error.message });
    }
};

//Supprime une chambre
exports.deleteChambre = async (req, res) => {
    try {
        await pool.query('DELETE FROM Chambre WHERE numeroChambre = ?', [req.params.id]);
        res.status(200).json({ message: 'Chambre supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la chambre', error: error.message });
    }
};

//Récupère les chambres d'un service
exports.getChambresByServiceId = async (req, res) => {
    try {
        const { numeroService } = req.params;
        const result = await pool.query('SELECT * FROM Chambre WHERE numeroService = ?', [numeroService]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des chambres pour le service', error: error.message });
    }
};
