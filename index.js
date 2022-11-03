import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';

import { connectionDB } from './database/config.js';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';

// dotenv.config()

// Crear el servidor express
const app = express()

// Conexión a la base de datos
connectionDB()

// CORS(cross-origin resource sharing)
app.use(cors())

// Directorio público
app.use(express.static('public'))

// Lectura y parseo del body (request)
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/events', eventsRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

// console.log(path.join(__dirname, '/dist', 'index.html'));

// Puerto - Escuchar peticiones
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))