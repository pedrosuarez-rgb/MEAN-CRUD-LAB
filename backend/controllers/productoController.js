const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

// Obtener todos los productos
exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find()
            .populate('categoria', 'nombre estado')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: productos.length,
            data: productos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            error: error.message
        });
    }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)
            .populate('categoria', 'nombre estado');
        
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: producto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener el producto',
            error: error.message
        });
    }
};

// Crear nuevo producto
exports.createProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, descripcion, categoria } = req.body;
        
        // Validar que la categoría exista
        const categoriaExiste = await Categoria.findById(categoria);
        if (!categoriaExiste) {
            return res.status(400).json({
                success: false,
                message: 'La categoría especificada no existe'
            });
        }

        const producto = new Producto({
            nombre,
            precio,
            stock: stock || 0,
            descripcion: descripcion || '',
            categoria
        });

        await producto.save();
        await producto.populate('categoria', 'nombre');

        res.status(201).json({
            success: true,
            message: 'Producto creado exitosamente',
            data: producto
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear producto',
            error: error.message
        });
    }
};

// Actualizar producto
exports.updateProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, descripcion, categoria } = req.body;
        
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        // Si cambia la categoría, validar que exista
        if (categoria && categoria !== producto.categoria.toString()) {
            const categoriaExiste = await Categoria.findById(categoria);
            if (!categoriaExiste) {
                return res.status(400).json({
                    success: false,
                    message: 'La categoría especificada no existe'
                });
            }
            producto.categoria = categoria;
        }

        if (nombre) producto.nombre = nombre;
        if (precio !== undefined) producto.precio = precio;
        if (stock !== undefined) producto.stock = stock;
        if (descripcion !== undefined) producto.descripcion = descripcion;

        await producto.save();
        await producto.populate('categoria', 'nombre');

        res.json({
            success: true,
            message: 'Producto actualizado exitosamente',
            data: producto
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar producto',
            error: error.message
        });
    }
};

// Eliminar producto
exports.deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Producto eliminado exitosamente',
            data: producto
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar producto',
            error: error.message
        });
    }
};