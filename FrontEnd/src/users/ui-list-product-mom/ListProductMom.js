import React, { useState } from 'react';
import './ListProductMom.css';
import SliderMoney from './SliderMoney';
import ThrowPage from './ThrowPage';

const initialProducts = [
    {
        name: "Sữa Ensure Úc vị Vanilla 850g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230613/sua-ensure-uc-vi-vanilla-850g.jpg?mode=max&width=400&height=400",
        link: "/sua-ensure-uc-vi-vanilla-850g",
        price: "765.000đ",
        oldPrice: "780.000đ",
        discount: "-15k",
    },
    {
        name: "Sữa bà bầu Morinaga (nhiều vị)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230308/sua-ba-bau-morinaga-nhieu-vi.jpg?mode=max&width=400&height=400",
        link: "/sua-ba-bau-morinaga",
        price: "215.000đ",
        oldPrice: "225.000đ",
        discount: "-10k",
    },
    {
        name: "Sữa bột Mejsu Mama 900g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230601/ua-bot-cho-me-dang-mang-thai-va-cho-con-bu-mesu-mama.jpg?mode=max&width=400&height=400",
        link: "/sua-bot-cho-phu-nu-co-thai-va-cho-con-bu-mejsu-mama-900g",
        price: "415.000đ",
    },
    {
        name: "Sữa bầu Bellamy's Organic (900g)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200226/sua-bau-bellamy-s-organic-1.png?mode=max&width=400&height=400",
        link: "/sua-bau-bellamy-s-organic-900g",
        price: "995.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa Ensure Gold 400g - hương lúa mạch (ít ngọt)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230424/sua-ensure-gold-400g-huong-lua-mach-it-ngot-1.jpg?mode=max&width=400&height=400",
        link: "/sua-ensure-gold-400g-huong-lua-mach-it-ngot",
        price: "340.000đ",
    },
    {
        name: "Sữa FrisoMum Gold 900g (hương cam)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200928/friso-mom-orange-900g.png?mode=max&width=400&height=400",
        link: "/sua-friso-mum-gold-900g-huong-cam",
        price: "509.000đ",
    },
    {
        name: "Sữa Frisomum Gold hương Vani - 900g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200928/mum-vani-mt-900.png?mode=max&width=400&height=400",
        link: "/sua-frisomum-gold-huong-vani-900g",
        price: "575.000đ",
    },
    // Additional products
    {
        name: "Sữa EnfaMama A+ (900g)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200723/sua-enfamama-a-900g.jpg?mode=max&width=400&height=400",
        link: "/sua-enfamama-a-900g",
        price: "600.000đ",
    },
    {
        name: "Sữa Dielac Mama Gold (900g)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200811/sua-dielac-mama-gold-900g.jpg?mode=max&width=400&height=400",
        link: "/sua-dielac-mama-gold-900g",
        price: "350.000đ",
    },
    {
        name: "Sữa Anmum Materna (800g)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200622/sua-anmum-materna-800g.jpg?mode=max&width=400&height=400",
        link: "/sua-anmum-materna-800g",
        price: "490.000đ",
    },
    {
        name: "Sữa Optimum Mama (900g)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200928/sua-optimum-mama-900g.jpg?mode=max&width=400&height=400",
        link: "/sua-optimum-mama-900g",
        price: "520.000đ",
    },
    {
        name: "Sữa Bầu XO (800g)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200525/sua-bau-xo-800g.jpg?mode=max&width=400&height=400",
        link: "/sua-bau-xo-800g",
        price: "680.000đ",
    },
    {
        name: "Sữa Bầu Anmum Materna (400g)",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20200723/sua-bau-anmum-materna-400g.jpg?mode=max&width=400&height=400",
        link: "/sua-bau-anmum-materna-400g",
        price: "270.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
    {
        name: "Sữa bột Glucerna hương vani 400g",
        imgSrc: "https://media.shoptretho.com.vn/upload/image/product/20230411/sua-glucerna-cho-nguoi-tieu-duong-400gr.png?mode=max&width=400&height=400",
        link: "/sua-glucerna-cho-nguoi-tieu-duong-400gr",
        price: "409.000đ",
    },
];

const ListProductMom = () => {
    const [sortOption, setSortOption] = useState("");
    const [products, setProducts] = useState(initialProducts);
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOption(value);
        sortProducts(value, products);
    };

    const sortProducts = (option, productsToSort) => {
        let sortedProducts = [...productsToSort];
        switch (option) {
            case "priceAsc":
                sortedProducts.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
                break;
            case "priceDesc":
                sortedProducts.sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')));
                break;
            case "nameAsc":
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "nameDesc":
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "promotionDesc":
                sortedProducts.sort((a, b) => {
                    const discountA = a.discount ? parseInt(a.discount.replace(/\D/g, '')) : 0;
                    const discountB = b.discount ? parseInt(b.discount.replace(/\D/g, '')) : 0;
                    return discountB - discountA;
                });
                break;
            default:
                sortedProducts = initialProducts;
                break;
        }
        setProducts(sortedProducts);
    };

    const handlePriceChange = (values) => {
        setPriceRange(values);
        filterProductsByPrice(values);
    };

    const filterProductsByPrice = (range) => {
        const [minPrice, maxPrice] = range;
        const filteredProducts = initialProducts.filter(product => {
            const productPrice = parseInt(product.price.replace(/\D/g, ''));
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
        setProducts(filteredProducts);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <section className="category_content width-common">
            <div className="wrap">
                <div className="main_content width-common">
                    <div className="cate_right" id="product_cate">
                        <input id="pageUrl" name="pageUrl" type="hidden" value="?page=1&categoryId=PC0046C29C9E334" />
                        <div className="title_cate_right" sortex="" sortdir="">
                            <h1 className="title_cate">Sữa &amp; dinh dưỡng</h1>
                            <span className="title_filter">
                                sắp xếp theo
                                <select name="sortProduct" id="sortProduct" value={sortOption} onChange={handleSortChange}>
                                    <option value="">Ngẫu nhiên</option>
                                    <option value="priceAsc">Giá tăng dần</option>
                                    <option value="priceDesc">Giá giảm dần</option>
                                    <option value="nameAsc">Tên A--Z</option>
                                    <option value="nameDesc">Tên Z--A</option>
                                    <option value="promotionDesc">Khuyến mại</option>
                                </select>
                            </span>
                            <div className="clear"></div>
                        </div>
                        <SliderMoney
                            min={0}
                            max={1000000}
                            step={10000}
                            values={priceRange}
                            onChange={handlePriceChange}
                        />
                        <div className="clear"></div>
                        <div className="list_item_cate">
                            {currentProducts.map((product, index) => (
                                <div className="product" key={index}>
                                    <div className="product_child">
                                        <div className="pro_img">
                                            <a href={product.link} target="_blank" rel="noopener noreferrer" title={product.name}>
                                                <img src={product.imgSrc} alt={product.name} />
                                            </a>
                                        </div>
                                        <h3 className="name_pro">
                                            <a href={product.link} target="_blank" rel="noopener noreferrer" title={product.name}>
                                                {product.name}
                                            </a>
                                        </h3>
                                        <div className="product_price">
                                            <span className="price_item">{product.price}</span>
                                            {product.oldPrice && <span className="old_price">{product.oldPrice}</span>}
                                        </div>
                                        {product.discount && <span className="discount">{product.discount}</span>}
                                    </div>
                                </div>
                            ))}
                            <div className="clear"></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
            <div className="background_black"></div>
            <div className='pagani'>
                <ThrowPage current={currentPage} onChange={handlePageChange} total={products.length} productsPerPage={productsPerPage} />
            </div>
        </section>
    );
};

export default ListProductMom;
