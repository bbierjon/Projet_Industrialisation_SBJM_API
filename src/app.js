// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = require('./config/corsConfig');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const patientRoutes = require('./routes/patientRoutes');
const infirmiereRoutes = require('./routes/infirmiereRoutes');
const litRoutes = require('./routes/litRoutes');
const chambreRoutes = require('./routes/chambreRoutes');
const equipementRoutes = require('./routes/equipementRoutes');
const servicesRoutes = require('./routes/serviceRoutes')
const secretairesRoutes = require('./routes/secretaireRoutes')
const reservationLitRoutes = require('./routes/reservationLitRoutes');
const authRoutes = require('./routes/authRoutes')
const checkTokenMiddleware = require('./middleware/checkToken');
const loggingMiddleware = require('./middleware/loggingMiddleware');

require('dotenv').config();

const { testConnection } = require('./config/dbConfig');

// Testez la connexion à la base de données
testConnection();

const app = express();
app.use(cors(corsOptions));
app.use(loggingMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Route d'authentification */
app.use('/api/auth', authRoutes);
/* Routes protégées */
app.use('/api/utilisateurs',checkTokenMiddleware, utilisateurRoutes);
app.use('/api/patients',checkTokenMiddleware, patientRoutes);
app.use('/api/infirmieres',checkTokenMiddleware, infirmiereRoutes);
app.use('/api/lits',checkTokenMiddleware, litRoutes);
app.use('/api/chambres',checkTokenMiddleware, chambreRoutes);
app.use('/api/equipements',checkTokenMiddleware, equipementRoutes);
app.use('/api/services', checkTokenMiddleware,servicesRoutes);
app.use('/api/secretaires',checkTokenMiddleware, secretairesRoutes);
app.use('/api/reservations',checkTokenMiddleware, reservationLitRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
