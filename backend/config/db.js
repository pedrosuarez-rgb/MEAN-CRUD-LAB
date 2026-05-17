const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/tienda_db');
        console.log('✅ MongoDB conectado exitosamente');
        console.log(`📀 Base de datos: ${mongoose.connection.name}`);
    } catch (error) {
        console.error('❌ Error al conectar MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;