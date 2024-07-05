import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductContentMom from './ProductContentMom';
import ProductDetail from './ProductDetailMom';
import NavCate from './NavCate';
import RelatedProducts from './RelatedProductMom';
import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';
import ProductRatingAll from './ProductRatingAll';
import { getUserIdFromToken } from "../../../store/actions/authAction";
import { useSelector } from "react-redux";
import Loading from '../../../layout/Loading';

const ProductScreen = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState([]);
    const { token, isLoggedIn } = useSelector((state) => state.auth);
    const userId = getUserIdFromToken(token);
    const [ratingCount, setRatingCount] = useState(0);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://hellomilkyshop123.azurewebsites.net/api/v1/comment/getCommentByProductID/${productId}`
            );
            const fetchedRatings = response.data.data.map((comment) => ({
                name: comment.UserName,
                date: new Date(comment.CommentDate).toLocaleDateString(),
                rating: comment.Rating,
                text: comment.Description,
                rep: comment.Rep,
                repDate: new Date(comment.RepDate).toLocaleDateString(),
                staffName: comment.StaffName,
            }));
            setRatings(fetchedRatings);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }, [productId]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://hellomilkyshop123.azurewebsites.net/api/v1/product/getProductInforID/${productId}`);
                setProduct(response.data[0]);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        const checkUserOrder = async () => {
            if (isLoggedIn) {
                try {
                    const response = await axios.post("https://hellomilkyshop123.azurewebsites.net/api/v1/comment/checkUserOrdered", {
                        UserID: userId,
                        ProductID: productId,
                    });
                    setRatingCount(response.data.count);
                } catch (err) {
                    console.error("Error checking user order:", err);
                }
            }
        };

        fetchProduct();
        checkUserOrder();
        fetchComments();
    }, [productId, userId, isLoggedIn, fetchComments]);

    if (loading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <div className='url-list'>
                <NavCate />
                <div className="breadcrumb-area-thinh-url">
                    <div className="container-thinh-url">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-wrap-thinh-url">
                                    <nav aria-label="breadcrumb-thinh-url">
                                        <ul className="breadcrumb-thinh-url">
                                            <li className="breadcrumb-item-thinh-url"><Link to="/"><i className="fa fa-home"></i></Link></li>
                                            {product.ProductID.includes("SE") ?
                                                <li className="breadcrumb-item-thinh-url"><a href="/sua-cho-be">Sữa cho bé</a></li>
                                                : <li className="breadcrumb-item-thinh-url"><a href="/sua-cho-me">Sữa cho mẹ</a></li>}
                                            <li className="breadcrumb-item-thinh-url active" aria-current="page">{product.ProductName}</li>
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
                            {ratingCount > 0 ? <ProductRating productID={product.ProductID} userID={userId} fetchComments={fetchComments} setRatingCount={setRatingCount} /> : <div></div>}
                            <ProductRatingAll productId={product.ProductID} ratings={ratings} />
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
