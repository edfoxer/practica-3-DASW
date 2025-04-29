const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Swagger
const { swaggerUi, specs } = require('./swagger/swagger'); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
const userRoutes = require('./routers/userRoutes');
const productRoutes = require('./routers/productRoutes');
const orderRoutes = require('./routers/orderRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error(err));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
