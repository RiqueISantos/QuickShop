import { BasketStatus } from '../enums/BasketStatus';
import { PaymentMethod } from '../enums/PaymentMethod';
import BasketModel, { Basket } from '../models/BasketModel';
import PlatziStoreService from "../Service/PlatziStoreService";

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

    async addProductToBasket(clientId: string, productId: any): Promise<Basket>{

        const basket =  await this.getBasketByClientId(clientId);
        const product = await PlatziStoreService.getExternalProductsById(productId);

        if(!basket) throw new Error('Customer cart not found.');
        if(!product) throw new Error('Product not found.');

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

    async updateBasket(clientId: string, productId: any, quantity: number): Promise<Basket>{

        const basket =  await this.getBasketByClientId(clientId);
    
        if(!basket) throw new Error('Customer cart not found.');

        const index = basket.products.findIndex(p => p.id.toString() === productId.toString());
        
        if (index === -1) {
            throw new Error('Product not found in cart.');
        }

        if(quantity <= 0){
            basket.products.splice(index,1);
        }else{
            basket.products[index].quantity = quantity;
        }

        basket.totalPrice = basket.products.reduce((sum, p) => sum + p.price * p.quantity, 0);

        await basket.save();

        return basket;
    }

    async paymentBasket(clientId: string, paymentMethod: PaymentMethod):Promise<Basket>{

        const savedBasket = await this.getBasketByClientId(clientId);
        
        if (!savedBasket) {
            throw new Error('Basket not found');
        }

        if (savedBasket.products.length === 0) {
            throw new Error('Cannot pay for an empty basket');
        }

        savedBasket.paymentMethod = paymentMethod;
        savedBasket.status = BasketStatus.CLOSED;

        await savedBasket.save();

        return savedBasket;
    }

}

export default new BasketService();