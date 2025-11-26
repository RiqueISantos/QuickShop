import { Request, Response } from "express";
import BasketService from "../Service/BasketService";
import { PaymentMethod } from "../enums/PaymentMethod";

class BasketController {

    /**
     * @swagger
     * /basket:
     *   post:
     *     summary: Cria ou retorna o carrinho aberto de um cliente
     *     tags:
     *       - Basket
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               clientId:
     *                 type: string
     *                 example: "12345"
     *     responses:
     *       201:
     *         description: Carrinho criado ou existente retornado
     *       400:
     *         description: ClientId não fornecido
     *       500:
     *         description: Erro interno do servidor
     */
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

    /**
     * @swagger
     * /basket:
     *   get:
     *     summary: Retorna todos os carrinhos
     *     tags:
     *       - Basket
     *     responses:
     *       200:
     *         description: Lista de todos os carrinhos
     *       500:
     *         description: Erro interno do servidor
     */
    public async getAllBaskets(req: Request, res: Response) {
        try {
            const baskets = await BasketService.getAllBaskets();
            return res.status(200).json(baskets);
        } catch (error) {
            return res.status(500).json({ message: "Error fetching baskets", error });
        }
    }


     /**
     * @swagger
     * /basket/{clientId}:
     *   get:
     *     summary: Retorna o carrinho de um cliente
     *     tags:
     *       - Basket
     *     parameters:
     *       - in: path
     *         name: clientId
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do cliente
     *     responses:
     *       200:
     *         description: Carrinho retornado com sucesso
     *       400:
     *         description: ClientId não fornecido
     *       404:
     *         description: Cliente não encontrado
     *       500:
     *         description: Erro interno do servidor
     */
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


     /**
     * @swagger
     * /basket/{clientId}/{productId}:
     *   post:
     *     summary: Adiciona um produto ao carrinho de um cliente
     *     tags:
     *       - Basket
     *     parameters:
     *       - in: path
     *         name: clientId
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: productId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Produto adicionado ao carrinho
     *       404:
     *         description: Cliente ou produto não encontrado
     *       500:
     *         description: Erro interno do servidor
     */
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


    /**
     * @swagger
     * /basket/{clientId}/{productId}:
     *   patch:
     *     summary: Atualiza a quantidade de um produto no carrinho
     *     tags:
     *       - Basket
     *     parameters:
     *       - in: path
     *         name: clientId
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: productId
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               quantity:
     *                 type: number
     *                 example: 3
     *     responses:
     *       200:
     *         description: Quantidade atualizada
     *       400:
     *         description: Dados inválidos
     *       404:
     *         description: Produto não encontrado no carrinho
     */
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


     /**
     * @swagger
     * /basket/{clientId}/payment/{paymentMethod}:
     *   post:
     *     summary: Realiza o pagamento do carrinho de um cliente
     *     tags:
     *       - Basket
     *     parameters:
     *       - in: path
     *         name: clientId
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: paymentMethod
     *         required: true
     *         schema:
     *           type: string
     *           enum: [CREDIT_CARD, DEBIT_CARD, PIX, NONE]
     *     responses:
     *       200:
     *         description: Pagamento realizado com sucesso
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro interno do servidor
     */
    public async paymentBasket(req: Request, res: Response){

        try{
            const { clientId, paymentMethod } = req.params;

            if(!clientId || !paymentMethod) return res.status(400).json({ message: 'ClientId and PaymentMethod are required'});

            const key = paymentMethod.toUpperCase();

            const enumPaymentMethod =  PaymentMethod[key as keyof typeof PaymentMethod];

            if (!enumPaymentMethod) {
                return res.status(400).json({ message: 'Invalid payment method' });
            }

            const basket = await BasketService.paymentBasket(clientId, enumPaymentMethod);

            return res.status(200).json(basket);
        }catch(error: any){
            return res.status(500).json({ message: error.message });
        }
        
    }

}

export default new BasketController();