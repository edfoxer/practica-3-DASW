// src/swagger/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API E-commerce DASW',
      version: '1.0.0',
      description: 'Documentación de la API para usuarios, productos y órdenes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routers/*.js')],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
