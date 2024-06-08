import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductContentMom from './ProductContentMom';
import ProductDetail from './ProductDetailMom';
import NavCate from './NavCate';
import RelatedProducts from './RelatedProductMom';

const ProductScreen = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/product/getProductInforID/${productId}`);
                console.log("Fetched Product Data:", response.data);
                setProduct(response.data[0]); // Lấy đối tượng đầu tiên từ mảng
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <NavCate />
            <div className='some row'>
                <div className='some-thang col-md-2'></div>
                <div className='col-md-10'>
                    <ProductContentMom product={product} />
                    <div className='row'>
                        <div className='col-md-9'>
                            <ProductDetail product={product} />
                        </div>
                        <div className='col-md-3'>
                            <RelatedProducts product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;
