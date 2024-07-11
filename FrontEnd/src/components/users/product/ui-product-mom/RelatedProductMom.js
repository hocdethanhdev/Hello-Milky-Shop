import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RelatedProductMom.css';
import Loading from '../../../layout/Loading';
import config from "../../../config/config";

const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const calculateDiscount = (originalPrice, discountedPrice) => {
    if (originalPrice === discountedPrice) {
        return 0;
    }
    return originalPrice - discountedPrice;
};

const formatDiscount = (discount) => {
    return `-${Math.round(discount / 1000)}K`;
};

const RelatedProducts = ({ product }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await axios.get(`${config.API_ROOT}/api/v1/product/getTop6ProductByBrand/${product.ProductID}`);

                if (Array.isArray(response.data)) {
                    setRelatedProducts(response.data);
                } else {
                    console.error('Unexpected response data format:', response.data);
                }
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [product]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        window.scrollTo(0, 0);
    };

    if (loading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="related-products-minith">
            <h2>Sản phẩm tương tự</h2>
            <ul>
                {relatedProducts.map((product) => {
                    const discountAmount = calculateDiscount(product.Price, product.PriceAfterDiscounts);
                    return (
                        <li key={product.ProductID} className="related-product-item-minith" onClick={() => handleProductClick(product.ProductID)}>
                            <div className="product-image-minith">
                                <img src={product.Image} alt={product.ProductName} />
                                {discountAmount > 0 && (
                                    <div className="discount-badge-thinh-minith">
                                        {formatDiscount(discountAmount)}
                                    </div>
                                )}
                            </div>
                            <div className="product-details-minith">
                                <h3>{product.ProductName}</h3>
                                <div className="product-price-minith">
                                    <span className="price-show price-item-minith">{formatPrice(product.PriceAfterDiscounts)}₫</span>
                                    {product.Price !== product.PriceAfterDiscounts && (
                                        <span className="old-price-minith">{formatPrice(product.Price)}₫</span>
                                    )}
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

RelatedProducts.propTypes = {
    product: PropTypes.shape({
        ProductID: PropTypes.string.isRequired,
        Price: PropTypes.number.isRequired,
        PriceAfterDiscounts: PropTypes.number.isRequired,
        Image: PropTypes.string.isRequired,
        ProductName: PropTypes.string.isRequired,
    }).isRequired,
};

export default RelatedProducts;
