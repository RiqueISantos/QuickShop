import { error } from 'console';
import { BasketStatus } from '../enums/BasketStatus';
import { PaymentMethod } from '../enums/PaymentMethod';
import BasketModel, { Basket } from '../models/BasketModel';
import PlatziStoreService from './PlatziStoreService';

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

    async getBasketByClientId(clientId: string){
        return BasketModel.findOne({
            clientId,
            status: BasketStatus.OPEN
        })
    }

    async addProductToBasket(clientId: string, productId: any){

        const basket =  await this.getBasketByClientId(clientId);
        const product = await PlatziStoreService.getExternalProductsById(productId);

        if(!basket) throw new Error('Carrinho do cliente não encontrado');
        if(!product) throw new Error('Produto não encontrado');

        const index = basket.products.findIndex(p => p.id.toString() === productId.toString());
        
        if(index > -1){
            basket.products[index].quantity +=1;
        }else{
            basket.products.push({
                id: productId,
                title: product.title,
                price: product.price,
                quantity: 1
            });
        }

        basket.totalPrice = basket.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

        await basket.save();

        return basket;
    }
}

export default new BasketService();