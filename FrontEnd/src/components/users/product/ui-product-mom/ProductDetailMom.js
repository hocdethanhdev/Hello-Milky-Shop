import React from 'react';
import './ProductDetailMom.css';
const ProductDetail = ({ product }) => {
    return (
        <div>
            <section className="product_detail-all-thinh width-common">
                <h2>Mô tả {product.ProductName}</h2>
                <div className="wrap">
                    <p className='thong-tin-sua-thinh'>{product.Description}</p>
                    <h2 className='hd-thinh'>  
                        Hướng dẫn bảo quản:
                    </h2>
                    <p className='con-hd-thinh'>
                        <p>Đậy kín sau mỗi lần sử dụng</p>
                        <p>Để nơi thoáng mát và khô ráo.</p>
                        <p>Không bảo quản trong tủ lạnh.</p>
                        <p>Nên sử dụng trong vòng 4 tuần sau khi mở bao bì.</p>
                    </p>


                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
