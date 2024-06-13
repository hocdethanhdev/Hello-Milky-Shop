import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ListProductMom.css';
import SliderMoney from './SliderMoney';
import ThrowPage from './ThrowPage';

const formatPrice = (price) => {
    if (price == null || isNaN(price)) {
        return '0';
    }
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const AllProduct = () => {
    const { keyword } = useParams();
    const [sortOption, setSortOption] = useState("");
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        fetchProducts();
        fetchBrands();
    }, [keyword]);

    const fetchProducts = async () => {
        try {
            let apiUrl = `http://localhost:5000/api/v1/product/getAllProducts`;

            if (keyword) {
                let modifiedKeyword = keyword.toLowerCase();

                if (modifiedKeyword.includes("mẹ") || modifiedKeyword.includes("me")) {
                    modifiedKeyword = "Sữa cho mẹ bầu";
                    apiUrl = `http://localhost:5000/api/v1/product/searchWithProductCategory/${encodeURIComponent(modifiedKeyword)}`;
                } else if (modifiedKeyword.includes("bé") || modifiedKeyword.includes("be")) {
                    modifiedKeyword = "Sữa cho em bé";
                    apiUrl = `http://localhost:5000/api/v1/product/searchWithProductCategory/${encodeURIComponent(modifiedKeyword)}`;
                } else {
                    apiUrl = `http://localhost:5000/api/v1/product/searchWithName?search=${keyword}`;
                }
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data && data.length > 0) {
                setOriginalProducts(data);
                setFilteredProducts(data);
            } else {
                setOriginalProducts([]);
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setOriginalProducts([]);
            setFilteredProducts([]);
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/product/getAllBrands');
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const handleSortChange = (e) => {
        const { value } = e.target;
        setSortOption(value);
        applyFiltersAndSorting(priceRange, value, selectedBrand);
    };

    const handlePriceChange = (values) => {
        setPriceRange(values);
        applyFiltersAndSorting(values, sortOption, selectedBrand);
    };

    const handleBrandChange = (e) => {
        const { value } = e.target;
        setSelectedBrand(value);
        applyFiltersAndSorting(priceRange, sortOption, value);
    };

    const applyFiltersAndSorting = (priceRange, sortOption, brand) => {
        let filteredProducts = filterProductsByPrice(priceRange, originalProducts);
        if (brand) {
            filteredProducts = filterProductsByBrand(brand, filteredProducts);
        }
        const sortedProducts = sortProducts(sortOption, filteredProducts);
        setFilteredProducts(sortedProducts);
    };

    const filterProductsByPrice = (range, productsToFilter) => {
        const [minPrice, maxPrice] = range;
        const parsePrice = (price) => {
            if (typeof price === 'string') {
                return parseInt(price.replace(/\D/g, ''));
            }
            return price;
        };

        return productsToFilter.filter(product => {
            const productPrice = parsePrice(product.Price);
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
    };

    const filterProductsByBrand = (brand, productsToFilter) => {
        return productsToFilter.filter(product => product.BrandName === brand);
    };

    const sortProducts = (option, productsToSort) => {
        let sortedProducts = [...productsToSort];
        const parsePrice = (price) => {
            if (typeof price === 'string') {
                return parseInt(price.replace(/\D/g, ''));
            }
            return price;
        };

        switch (option) {
            case "priceAsc":
                sortedProducts.sort((a, b) => parsePrice(a.Price) - parsePrice(b.Price));
                break;
            case "priceDesc":
                sortedProducts.sort((a, b) => parsePrice(b.Price) - parsePrice(a.Price));
                break;
            case "nameAsc":
                sortedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
                break;
            case "nameDesc":
                sortedProducts.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
                break;
            case "promotionDesc":
                sortedProducts.sort((a, b) => {
                    const discountA = parsePrice(a.Price) !== parsePrice(a.PriceAfterDiscounts) ? parsePrice(a.Price) - parsePrice(a.PriceAfterDiscounts) : 0;
                    const discountB = parsePrice(b.Price) !== parsePrice(b.PriceAfterDiscounts) ? parsePrice(b.Price) - parsePrice(b.PriceAfterDiscounts) : 0;
                    return discountB - discountA;
                });
                break;
            default:
                sortedProducts = productsToSort;
                break;
        }
        return sortedProducts;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <section className="category_content width-common">
            <div className="wrap">
                <div className="main_content width-common">
                    <div className="cate_right" id="product_cate">
                        <input id="pageUrl" name="pageUrl" type="hidden" value="?page=1&categoryId=PC0046C29C9E334" />
                        <div className="title_cate_right" sortex="" sortdir="">
                            <h1 className="title_cate">Sữa &amp; dinh dưỡng</h1>

                            <div className='loc-theo-gia-list-mom'>
                                <div className='center-text-list-promom'>Lọc theo giá</div>
                                <SliderMoney
                                    min={0}
                                    max={2000000}
                                    step={10000}
                                    values={priceRange}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div className='loc-theo-brand-list-mom'>
                                <div className='center-text-list-promom'>Lọc theo thương hiệu</div>
                                <select name="brandFilter" id="brandFilter" value={selectedBrand} onChange={handleBrandChange}>
                                    <option value="">Tất cả</option>
                                    {brands.map((brand, index) => (
                                        <option key={index} value={brand.BrandName}>{brand.BrandName}</option>
                                    ))}
                                </select>
                            </div>

                            <span className="title_filter">
                                <div className='center-text-list-promom'>Sắp xếp theo</div>
                                <select name="sortProduct" id="sortProduct" value={sortOption} onChange={handleSortChange}>
                                    <option value="">Ngẫu nhiên</option>
                                    <option value="priceAsc">Giá tăng dần</option>
                                    <option value="priceDesc">Giá giảm dần</option>
                                    <option value="nameAsc">Tên A--Z</option>
                                    <option value="nameDesc">Tên Z--A</option>
                                    <option value="promotionDesc">Khuyến mại</option>
                                </select>
                            </span>
                        </div>

                        <div className="clear"></div>
                        <div className="list_item_cate">
                            {filteredProducts.length > 0 ? (
                                currentProducts.map((product, index) => (
                                    <div className="product" key={index}>
                                        <div className="product_child">
                                            <div className="pro_img">
                                                <Link to={`/product/${product.ProductID}`} title={product.ProductName}>
                                                    <img src={product.Image} alt={product.ProductName} />
                                                </Link>
                                            </div>
                                            <h3 className="name_pro">
                                                <Link to={`/product/${product.ProductID}`} title={product.ProductName}>
                                                    {product.ProductName}
                                                </Link>
                                            </h3>
                                            <div className="product_price">
                                                <span className="price_item">{formatPrice(product.PriceAfterDiscounts)}₫</span>
                                                {product.Price !== product.PriceAfterDiscounts && <span className="old_price">{formatPrice(product.Price)}₫</span>}
                                            </div>
                                            {product.Price !== product.PriceAfterDiscounts && <span className="discount">-{formatPrice((product.Price - product.PriceAfterDiscounts) / 1000)}K</span>}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='khong-tim-search'>Không tìm được sản phẩm</p>
                            )}
                            <div className="clear"></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
            <div className="background_black"></div>
            <div className='pagani'>
                <ThrowPage current={currentPage} onChange={handlePageChange} total={filteredProducts.length} productsPerPage={productsPerPage} />
            </div>
        </section>
    );
};

export default AllProduct;
