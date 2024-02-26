const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction pour extraire le token Bearer de l'en-tête d'autorisation
const extractBearer = (authorization) => {
    if (typeof authorization !== 'string') {
        return false;
    }
    // On isole le token
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2] ? matches[2] : null;
};

// Vérification de la présence du token
const checkTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearer(req.headers.authorization);

    if (!token) {
        return res.status(401).json({ message: 'Aucun token fourni' });
    }

    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            console.error(err); // Pour le débogage
            return res.status(401).json({ message: 'Token invalide', error: err.message });
        }

        // Ajout de l'identifiant de l'utilisateur à l'objet req
        req.userId = decodedToken.id; // Assurez-vous que le token contient un champ 'id'
        //console.log("L'id de l'utilisateur qui s'est connecté est : "+req.userId)
        next();
    });
};

module.exports = checkTokenMiddleware;
