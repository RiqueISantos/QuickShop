import { Request, Response} from 'express';
import PlatziStoreService from '../Service/PlatziStoreService';

class ProductsController {

    /**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para gerenciamento de produtos externos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna todos os produtos da API externa
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do produto
 *                   title:
 *                     type: string
 *                     description: Nome do produto
 *                   price:
 *                     type: number
 *                     description: Preço do produto
 *       500:
 *         description: Erro ao buscar os produtos
 */
    public async getAllProducts(req: Request, res: Response): Promise<Response> {
        try {  
            const products = await PlatziStoreService.getExternalProducts();
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error retrieving products', error });
        }
    }

    /**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retorna um produto específico pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao buscar o produto
 */
    public async getProductById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const product = await PlatziStoreService.getExternalProductsById(id);   
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving product', error });
        }
    }
}

export default new ProductsController();