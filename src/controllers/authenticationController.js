// Assurez-vous d'avoir importé les modules nécessaires au début de votre fichier
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { pool } = require('../config/dbConfig'); // Vérifiez que le chemin vers dbConfig est correct

dotenv.config(); // Charger les variables d'environnement à partir d'un fichier .env

exports.login = async (req, res) => {
    const { identifiant, motDePasse } = req.body;

    // Vérifie qu'un identifiant et un mot de passe ont été rentrés
    if (!identifiant || !motDePasse) {
        return res.status(400).json({ message: 'Identifiant ou mot de passe manquant' });
    }

    try {
        // Exécution de la requête à la base de données
        const results = await pool.query('SELECT * FROM Utilisateur WHERE identifiant = ?', [identifiant]);

        // Vérification si un utilisateur a été trouvé
        if (results.length === 0) {
            return res.status(401).json({ message: 'Ce compte n’existe pas !' });
        }

        // Accès direct au premier utilisateur trouvé
        const user = results[0];

        // Comparaison des mots de passe
        const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
        console.log(isPasswordValid);

        //Vérification de la validité du mot de passe
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        let role = 'Inconnu';

        // Déterminer le rôle de l'utilisateur
        const [infirmieresRows, secretairesRows, patientsRows] = await Promise.all([
            pool.query('SELECT * FROM Infirmiere WHERE numeroUtilisateur = ?', [user.numeroUtilisateur]),
            pool.query('SELECT * FROM Secretaire WHERE numeroUtilisateur = ?', [user.numeroUtilisateur]),
            pool.query('SELECT * FROM Patient WHERE numeroUtilisateur = ?', [user.numeroUtilisateur]),
        ]);

        //Vérifie le role de l'utilisateur
        if (infirmieresRows.length > 0) {
            role = 'infirmiere';
        } else if (secretairesRows.length > 0) {
            role = 'secretaire';
        } else if (patientsRows.length > 0) {
            role = 'patient';
        } else {
            role = 'inconnue';
        }

        // Génération du token JWT
        const expiresIn = parseInt(process.env.JWT_DURING, 10); // Assurez-vous que cette variable d'environnement est définie
        const token = jwt.sign(
            {
                id: user.numeroUtilisateur,
                identifiant: user.identifiant,
                role: role, // Inclure le rôle dans le token
            },
            process.env.JWT_SECRET,
            { expiresIn: expiresIn }
        ); // Assurez-vous que JWT_SECRET est aussi définie

        // Réponse avec le token d'accès
        return res.json({ access_token: token });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({ message: 'Le processus de connexion a échoué' }); // Ne renvoyez pas les détails de l'erreur au client
    }
};
