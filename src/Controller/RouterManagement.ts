import { Router } from "express";
import ProductsController from "./ProductsController";
import BasketController from "./BasketController";

const RouterManagement = Router();

RouterManagement.get('/products', ProductsController.getAllProducts.bind(ProductsController));
RouterManagement.get('/products/:id', ProductsController.getProductById.bind(ProductsController));
RouterManagement.post('/basket', BasketController.createBasket.bind(BasketController));
RouterManagement.get('/basket', BasketController.getAllBaskets.bind(BasketController));
RouterManagement.get('/basket/:clientId', BasketController.getBasketByClientId.bind(BasketController));
RouterManagement.post('/basket/:clientId/:productId', BasketController.addProductToBasket.bind(BasketController));
RouterManagement.patch('/basket/:clientId/:productId', BasketController.updateBasketProduct.bind(BasketController));

export default RouterManagement;