import React from 'react';
import './RelatedProductMom.css';
const relatedProducts = [
    {
        href: "/sua-ensure-uc-vi-vanilla-850g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg?mode=max&width=92&height=92",
        imgAlt: "Sữa Ensure Úc vị Vanilla 850g",
        title: "Sữa Ensure Úc vị Vanilla 850g",
        name: "Sữa Ensure Úc vị Vanilla 850g",
        price: "765.000đ",
        labelKm: "tiết kiệm 15k"
    },
    {
        href: "/sua-ensure-gold-850g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230322/sua-ensure-gold-850g.png?mode=max&width=92&height=92",
        imgAlt: "Sữa Ensure Gold 850g - hương vani",
        title: "Sữa Ensure Gold 850g - hương vani",
        name: "Sữa Ensure Gold 850g - hương vani",
        price: "879.000đ"
    },
    {
        href: "/sua-glucerna-cho-nguoi-tieu-duong-850gr",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230413/sua-glucerna-cho-nguoi-tieu-duong-850gr.png?mode=max&width=92&height=92",
        imgAlt: "Sữa bột Glucerna hương vani 850g ",
        title: "Sữa bột Glucerna hương vani 850g ",
        name: "Sữa bột Glucerna hương vani 850g ",
        price: "889.000đ"
    },
    {
        href: "/sua-bot-anlene-gold-movepro-800g-40y-nhieu-vi",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230620/sua-bot-anlene-gold-movepro-800g-40y-vi-vani.jpg?mode=max&width=92&height=92",
        imgAlt: "Sữa bột Anlene Gold Movepro 800g ",
        title: "Sữa bột Anlene Gold Movepro 800g ",
        name: "Sữa bột Anlene Gold Movepro 800g ",
        price: "400.000đ"
    },
    {
        href: "/sua-bot-anlene-total-10-800g-40y-vi-vani",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230620/sua-bot-anlene-total-10-800g-40y-vi-vani-1.jpg?mode=max&width=92&height=92",
        imgAlt: "Sữa bột Anlene Total 10 800g ",
        title: "Sữa bột Anlene Total 10 800g ",
        name: "Sữa bột Anlene Total 10 800g ",
        price: "679.000đ"
    },
    {
        href: "/sua-bot-anlene-gold-5x-800g-40y-vi-vani",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230621/sua-bot-anlene-gold-5x-800g-40y-vi-vani-2.jpg?mode=max&width=92&height=92",
        imgAlt: "Sữa bột Anlene Gold 5X 800g ",
        title: "Sữa bột Anlene Gold 5X 800g ",
        name: "Sữa bột Anlene Gold 5X 800g ",
        price: "499.000đ"
    }
];

const RelatedProducts = () => {
    return (


        <div className="section_product_related_sp_thinh">

            <div className="list_product_related_sp_thinh">
                <div className="title_product_related_sp_thinh">Sản phẩm tương tự</div>
                {relatedProducts.map((product, index) => (
                    <div className="product_related_sp_thinh" key={index}>
                        <div className="img_product_related_sp_thinh">
                            <a href={product.href} title={product.title}>
                                <img src={product.imgSrc} alt={product.imgAlt} />
                            </a>
                        </div>
                        <div className="info_product_related_sp_thinh">
                            <h3 className="name_product_related_sp_thinh">
                                <a href={product.href} title={product.title}>
                                    {product.name}
                                </a>
                            </h3>
                            <span className="price_product_related_sp_thinh">{product.price}</span>

                        </div>
                        <div className="clear"></div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default RelatedProducts;
