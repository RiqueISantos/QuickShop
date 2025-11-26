import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Basket API',
            version: '1.0.0',
            description: 'API de carrinho de compras com Express, TypeScript e MongoDB',
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/Controller/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger rodando em: http://localhost:8080/api-docs');
}
