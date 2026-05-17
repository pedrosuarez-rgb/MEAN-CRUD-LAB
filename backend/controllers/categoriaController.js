const Categoria = require('../models/Categoria');

// Obtener todas las categorías
exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: categorias.length,
            data: categorias
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener categorías',
            error: error.message
        });
    }
};

// Obtener una categoría por ID
exports.getCategoriaById = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }
        res.json({
            success: true,
            data: categoria
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener la categoría',
            error: error.message
        });
    }
};

// Crear nueva categoría
exports.createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;
        
        // Validar que el nombre no exista
        const existe = await Categoria.findOne({ nombre: nombre.toUpperCase() });
        if (existe) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una categoría con ese nombre'
            });
        }

        const categoria = new Categoria({
            nombre: nombre.toUpperCase(),
            descripcion,
            estado: estado !== undefined ? estado : true
        });

        await categoria.save();
        
        res.status(201).json({
            success: true,
            message: 'Categoría creada exitosamente',
            data: categoria
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear categoría',
            error: error.message
        });
    }
};

// Actualizar categoría
exports.updateCategoria = async (req, res) => {
    try {
        const { nombre, descripcion, estado } = req.body;
        
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        // Si cambia el nombre, verificar que no exista
        if (nombre && nombre !== categoria.nombre) {
            const existe = await Categoria.findOne({ nombre: nombre.toUpperCase() });
            if (existe) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe una categoría con ese nombre'
                });
            }
            categoria.nombre = nombre.toUpperCase();
        }

        if (descripcion !== undefined) categoria.descripcion = descripcion;
        if (estado !== undefined) categoria.estado = estado;

        await categoria.save();

        res.json({
            success: true,
            message: 'Categoría actualizada exitosamente',
            data: categoria
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar categoría',
            error: error.message
        });
    }
};

// Eliminar categoría
exports.deleteCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByIdAndDelete(req.params.id);
        if (!categoria) {
            return res.status(404).json({
                success: false,
                message: 'Categoría no encontrada'
            });
        }

        res.json({
            success: true,
            message: 'Categoría eliminada exitosamente',
            data: categoria
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar categoría',
            error: error.message
        });
    }
};