import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1';

class PlatziStoreService {

    getExternalProducts = async () => {
        const response = await axios.get(`${API_URL}/products`);
        
        return response.data.map((product: any) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
        }));
    };

    getExternalProductsById = async (id: any) => {
        const response = await axios.get(`${API_URL}/products/${id}`);
        const product = response.data;
        
        return {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
        };
    }
}

export default new PlatziStoreService();