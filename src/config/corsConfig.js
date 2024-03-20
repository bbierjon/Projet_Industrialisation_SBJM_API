//Exportation de l'API
module.exports = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
    allowedHeaders: 'Content-Type,X-API-Key,X-Organization-Id,Authorization',
};
