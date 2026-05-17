const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    descripcion: {
        type: String,
        default: '',
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoría es requerida']
    }
}, {
    timestamps: true
});

// Índices para búsquedas
productoSchema.index({ nombre: 1 });
productoSchema.index({ categoria: 1 });

module.exports = mongoose.model('Producto', productoSchema);