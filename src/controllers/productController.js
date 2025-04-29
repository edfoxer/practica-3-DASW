const Product = require('../models/Product');

// Crear nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto' });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado exitosamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
