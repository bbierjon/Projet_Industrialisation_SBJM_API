// src/controllers/reservationLitController.js
const {pool} = require('../config/dbConfig');

/*Récupération de toutes les réservations*/

exports.getAllReservations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Reservation');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Reservation WHERE numeroReservation = ?', [req.params.id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la réservation', error: error.message });
    }
};

exports.createReservation = async (req, res) => {
    const dateDebut = new Date(req.body.dateDebut).toISOString().slice(0, 19).replace('T', ' ');
    const dateFin = new Date(req.body.dateFin).toISOString().slice(0, 19).replace('T', ' ');
    const { numeroLit, numeroPatient } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Reservation (dateDebut, dateFin, numeroLit, numeroPatient) VALUES (?, ?, ?, ?)',
            [dateDebut, dateFin, numeroLit, numeroPatient]
        );
        // Convertir le résultat en chaîne de caractères si c'est un BigInt
        const id = result.insertId.toString();
        res.status(201).json({ message: 'Reservation créée avec succès', id: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la reservation', error: error.message });
    }
};


exports.updateReservation = async (req, res) => {
    const dateDebut = new Date(req.body.dateDebut).toISOString().slice(0, 19).replace('T', ' ');
    const dateFin = new Date(req.body.dateFin).toISOString().slice(0, 19).replace('T', ' ');
    const { numeroLit, numeroPatient } = req.body;
    try {
        await pool.query('UPDATE Reservation SET dateDebut = ?, dateFin = ?, numeroLit = ?, numeroPatient = ? WHERE numeroReservation = ?', [dateDebut, dateFin, numeroLit, numeroPatient, req.params.id]);
        res.status(200).json({ message: 'Réservation mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la réservation', error: error.message });
    }
};

exports.deleteReservation = async (req, res) => {
    try {
        await pool.query('DELETE FROM Reservation WHERE numeroReservation = ?', [req.params.id]);
        res.status(200).json({ message: 'Réservation supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error: error.message });
    }
};
