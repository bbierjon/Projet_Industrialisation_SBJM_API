// src/middleware/loggingMiddleware.js

function loggingMiddleware(req, res, next) {
    const start = process.hrtime();

    res.on('finish', () => { // La réponse est prête à être envoyée au client
        const durationInMilliseconds = getDurationInMilliseconds(start);
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${durationInMilliseconds.toLocaleString()} ms`);
    });

    next(); // Passe au prochain middleware
}

function getDurationInMilliseconds(start) {
    const NS_PER_SEC = 1e9; // Convertir nanosecondes en secondes
    const NS_TO_MS = 1e6; // Convertir nanosecondes en millisecondes
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}

module.exports = loggingMiddleware;
