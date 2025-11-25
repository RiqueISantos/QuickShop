import { BasketStatus } from '../enums/BasketStatus';
import { PaymentMethod } from '../enums/PaymentMethod';
import BasketModel, { Basket } from '../models/BasketModel';

class BasketService {

    async createBasket(clientId: string): Promise<Basket> {
        
        const basketExisting = await BasketModel.findOne({ clientId, status: BasketStatus.OPEN});

        if(basketExisting) {
            return basketExisting;
        }

        const basket = new BasketModel({
            clientId,
            products: [],
            totalPrice: 0,
            status: BasketStatus.OPEN,
            paymentMethod: PaymentMethod.NONE
        })

        await basket.save();

        return basket;
    }

    async getAllBaskets(){
        return BasketModel.find();
    }
}

export default new BasketService();