// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const patientRoutes = require('./routes/patientRoutes');
const infirmiereRoutes = require('./routes/infirmiereRoutes');
const litRoutes = require('./routes/litRoutes');
const chambreRoutes = require('./routes/chambreRoutes');
const equipementRoutes = require('./routes/equipementRoutes');
const servicesRoutes = require('./routes/serviceRoutes')
const secretairesRoutes = require('./routes/secretaireRoutes')
const reservationLitRoutes = require('./routes/reservationLitRoutes');

require('dotenv').config();

const { testConnection } = require('./config/dbConfig');

// Testez la connexion à la base de données
testConnection();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/utilisateurs', utilisateurRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/infirmieres', infirmiereRoutes);
app.use('/api/lits', litRoutes);
app.use('/api/chambres', chambreRoutes);
app.use('/api/equipements', equipementRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/secretaires', secretairesRoutes);
app.use('/api/reservations', reservationLitRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
