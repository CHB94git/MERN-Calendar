import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectionDB } from './database/config.js';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';

dotenv.config()

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

// Puerto - Escuchar peticiones
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running in port ${PORT}`))