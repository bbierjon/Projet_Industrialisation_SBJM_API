const mariadb = require('mariadb');
require('dotenv').config();

//Configuration de la base de données
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

//Verification de la connexion
const testConnection = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('La connexion à la base de données a réussi !');
    } catch (err) {
        console.error('Impossible de se connecter à la base de données:', err);
    } finally {
        if (conn) await conn.release(); // Libère la connexion dans le pool
    }
};

//Exportation de la configuration
module.exports = { pool, testConnection };
