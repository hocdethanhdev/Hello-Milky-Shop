// productService.js
import axios from 'axios';
import config from "../../config/config";
export const getMaxQuantity = async (productId) => {
    try {

        const response = await axios.get(`${config.API_ROOT}/api/v1/product/getProductInforID/${productId}`);
        return parseInt(response.data[0].StockQuantity);
    } catch (error) {
        console.error(`Error fetching max quantity for product ${productId}:`, error);
        return null;
    }
};
