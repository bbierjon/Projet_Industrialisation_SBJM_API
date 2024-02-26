const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

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


module.exports = { pool, testConnection };
