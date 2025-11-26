import { Request, Response } from "express";
import BasketService from "../Service/BasketService";

class BasketController {
    
    public async createBasket(req: Request, res: Response) {
        
        const { clientId } = req.body;

        if(!clientId){
            return res.status(400).json({message: "ClientId is required"});
        }

        try {
            const basket = await BasketService.createBasket(clientId);
            return res.status(201).json(basket);
        } catch (error) {
            return res.status(500).json({ message: "Error creating basket", error });
        }
    }

    public async getAllBaskets(req: Request, res: Response) {
        try {
        const baskets = await BasketService.getAllBaskets();
        return res.status(200).json(baskets);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching baskets", error });
        }
    }

    public async getBasketByClientId(req: Request, res: Response){

        const { clientId } = req.params;

        try{
            if(!clientId) {
                return res.status(400).json({message: "ClientId is required"});
            }

            const basketByClient = await BasketService.getBasketByClientId(clientId);

            if(!basketByClient) {
                return res.status(404).json({ message: 'Client not found'});
            }

            return res.status(200).json(basketByClient);
        }catch(error){
            return res.status(500).json({ message: "Error fetching baskets", error });
        }
    }

    public async addProductToBasket(req: Request, res: Response){
        const { clientId, productId } = req.params;

        try {
            if (!clientId) return res.status(404).json({ message: 'ClientId is required' });
            if (!productId) return res.status(404).json({ message: 'ProductId is required' });

            const basket = await BasketService.addProductToBasket(clientId, productId);

            return res.status(200).json(basket);
        } catch (error: any) {
            return res.status(500).json({ message: error.message || "Error fetching baskets" });
        }
    }

    public async updateBasketProduct(req: Request, res: Response) {
        try {
            const { clientId, productId } = req.params;
            const { quantity } = req.body;

            if (!clientId || !productId) {
                return res.status(400).json({ message: 'ClientId and ProductId are required' });
            }

            if (quantity === undefined || quantity === null) {
                return res.status(400).json({ message: 'Quantity is required' });
            }

            const updatedBasket = await BasketService.updateBasket(
                clientId,
                productId,
                quantity
            );
            return res.status(200).json(updatedBasket);
        
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new BasketController();