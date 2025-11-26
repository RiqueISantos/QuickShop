import { Request, Response} from 'express';
import PlatziStoreService from '../Service/PlatziStoreService';

class ProductsController {
    public async getAllProducts(req: Request, res: Response): Promise<Response> {
        try {  
            const products = await PlatziStoreService.getExternalProducts();
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(500).json({ message: 'Error retrieving products', error });
        }
    }

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