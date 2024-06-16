import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductContentMom from './ProductContentMom';
import ProductDetail from './ProductDetailMom';
import NavCate from './NavCate';
import RelatedProducts from './RelatedProductMom';
import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';
import ProductRatingAll from './ProductRatingAll';
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
            <div className='url-list'>
                <NavCate />
                <div class="breadcrumb-area-thinh-url">
                    <div class="container-thinh-url">
                        <div class="row">
                            <div class="col-12">
                                <div class="breadcrumb-wrap-thinh-url">
                                    <nav aria-label="breadcrumb-thinh-url">
                                        <ul class="breadcrumb-thinh-url">
                                            <li class="breadcrumb-item-thinh-url"><Link to="/"><i class="fa fa-home"></i></Link></li>
                                            {product.ProductID.includes("SE") ?
                                                <li class="breadcrumb-item-thinh-url"><a href="/sua-cho-be">Sữa cho bé</a></li>
                                                : <li class="breadcrumb-item-thinh-url"><a href="/sua-cho-me">Sữa cho mẹ</a></li>}

                                            <li class="breadcrumb-item-thinh-url active" aria-current="page">{product.ProductName}</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='some row'>
                <div className='some-thang col-md-2'></div>
                <div className='col-md-10'>
                    <ProductContentMom product={product} />
                    <div className='row'>
                        <div className='col-md-9'>
                            <ProductDetail product={product} />
                            <ProductRating />
                            <ProductRatingAll />
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
