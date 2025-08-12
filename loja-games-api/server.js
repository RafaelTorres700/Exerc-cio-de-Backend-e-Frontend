const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gamesRoutes = require('./routes/games');

const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: '*', // ou especifique: 'http://127.0.0.1:5500'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/games', gamesRoutes);

// Aqui você usa APP_PORT (não DB_PORT!)
const PORT = process.env.APP_PORT || 3024;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));