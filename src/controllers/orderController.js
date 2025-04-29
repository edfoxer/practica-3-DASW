const Order = require('../models/Order');

// Crear nueva orden
exports.createOrder = async (req, res) => {
  try {
    const { products, total } = req.body;
    const order = new Order({
      userId: req.user.id,
      products,
      total,
    });
    await order.save();
    res.status(201).json({ message: 'Orden creada exitosamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al crear orden' });
  }
};

// Obtener todas las órdenes del usuario autenticado
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

// Obtener detalle de una orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products');
    if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
    if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos para acceder a esta orden' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener orden' });
  }
};
