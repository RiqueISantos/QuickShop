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
}

export default new BasketController();