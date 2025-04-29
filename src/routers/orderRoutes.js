const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { 
  createOrder, 
  getOrders, 
  getOrderById 
} = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Endpoints para gestión de órdenes
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Obtener todas las órdenes del usuario autenticado
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de órdenes del usuario
 */
router.get('/', auth, getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener detalle de una orden por ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la orden
 */
router.get('/:id', auth, getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear una nueva orden (usuario autenticado)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 */
router.post('/', auth, createOrder);

module.exports = router;
