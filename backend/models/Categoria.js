const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true,
        trim: true,
        uppercase: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    descripcion: {
        type: String,
        default: '',
        maxlength: [200, 'La descripción no puede exceder 200 caracteres']
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true  // Agrega createdAt y updatedAt automáticamente
});

// Índice para búsquedas
categoriaSchema.index({ nombre: 1 });

module.exports = mongoose.model('Categoria', categoriaSchema);