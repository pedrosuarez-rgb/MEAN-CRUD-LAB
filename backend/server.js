const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

// Inicializar Express
const app = express();

// Middlewares
app.use(cors());                    // Permitir peticiones de otros dominios
app.use(morgan('dev'));             // Logging de peticiones
app.use(express.json());            // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear formularios

// Rutas
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/productos', require('./routes/productos'));

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'API de Tienda funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            categorias: 'http://localhost:3000/api/categorias',
            productos: 'http://localhost:3000/api/productos'
        }
    });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Ruta no encontrada: ${req.method} ${req.url}`
    });
});

// Manejo global de errores
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponibles:`);
    console.log(`   - GET    /api/categorias`);
    console.log(`   - POST   /api/categorias`);
    console.log(`   - GET    /api/productos`);
    console.log(`   - POST   /api/productos`);
});