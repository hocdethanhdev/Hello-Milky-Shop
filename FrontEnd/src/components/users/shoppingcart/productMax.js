// productService.js
import axios from 'axios';

export const getMaxQuantity = async (productId) => {
    try {

        const response = await axios.get(`https://hellomilkyshop123.azurewebsites.net/api/v1/product/getProductInforID/${productId}`);
        return response.data[0].StockQuantity;
    } catch (error) {
        console.error(`Error fetching max quantity for product ${productId}:`, error);
        return null;
    }
};
