// Assurez-vous d'avoir importé les modules nécessaires au début de votre fichier
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool } = require('../config/dbConfig'); // Vérifiez que le chemin vers dbConfig est correct

exports.login = async (req, res) => {
    const { identifiant, motDePasse } = req.body;

    if (!identifiant || !motDePasse) {
        return res.status(400).json({ message: 'Identifiant ou mot de passe manquant' });
    }

    try {
        console.log(`Tentative de connexion avec l'identifiant : ${identifiant}`);
        // Exécution de la requête à la base de données
        const results = await pool.query('SELECT * FROM Utilisateur WHERE identifiant = ?', [identifiant]);
        console.log(results);

        // Vérification si un utilisateur a été trouvé
        if (results.length === 0) {
            return res.status(401).json({ message: 'Ce compte n’existe pas !' });
        }

        // Accès direct au premier utilisateur trouvé
        const user = results[0];
        console.log("Utilisateur récupéré depuis la BDD :", user);

        // Comparaison des mots de passe
        console.log("Le mot de passe récupéré de la base de donnée : " , user.motDePasse);
        console.log("Le mot de passe récupéré de de l'api : " , motDePasse);

        const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Génération du token JWT
        const expiresIn = parseInt(process.env.JWT_DURING, 10); // Assurez-vous que cette variable d'environnement est définie
        const token = jwt.sign({
            id: user.numeroUtilisateur,
            identifiant: user.identifiant
        }, process.env.JWT_SECRET, { expiresIn: expiresIn }); // Assurez-vous que JWT_SECRET est aussi définie

        // Réponse avec le token d'accès
        return res.json({ access_token: token });
    } catch (err) {
        console.error("Erreur lors de la connexion :", err);
        res.status(500).json({ message: 'Le processus de connexion a échoué', error: err.message });
    }
};
