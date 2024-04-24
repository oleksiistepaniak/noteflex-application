const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes application API',
            version: '1.0.0',
            description: 'Notes API Documentation',
        },
    },
    apis: ['./src/routes/*.js'],
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local Server',
        },
    ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
