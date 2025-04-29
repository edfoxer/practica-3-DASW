const router = require("express").Router();
const { auth, isAdmin } = require("../middlewares/auth");
const { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gestión de productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos del producto
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto (solo admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post("/", auth, isAdmin, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto (solo admin)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 */
router.put("/:id", auth, isAdmin, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto (solo admin)
 *     tags: [Products]
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
 *         description: Producto eliminado exitosamente
 */
router.delete("/:id", auth, isAdmin, deleteProduct);

module.exports = router;
