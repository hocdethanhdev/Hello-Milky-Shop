import React, { useState, useEffect } from 'react';
import { Modal, List, Checkbox, Button, Input, Row, Col, Card, Tooltip, Select } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import './ProductSelectionModal.css';
const { Option } = Select;

const ProductSelectionModal = ({ promotionID, selectedProducts, setSelectedProducts, onClose }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/product/getInfoProductsDetail');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchPromotionProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/promotion/getProductsApplyAnPromotion/${promotionID}`);
            setSelectedProducts(response.data.result);
        } catch (error) {
            console.error('Error fetching promotion products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchPromotionProducts();
    }, []);

    const handleCheckboxChange = (productID) => {
        if (selectedProducts.includes(productID)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productID));
        } else {
            setSelectedProducts([...selectedProducts, productID]);
        }
    };

    const handleSave = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/v1/promotion/applyPromotionToProduct',
                { productIDs: selectedProducts, promotionID },
                { headers: { 'Content-Type': 'application/json' } }
            );
            onClose();
        } catch (error) {
            console.error('Error adding product to promotion:', error);
        }
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products.map(product => product.ProductID));
        }
    };

    const filteredProducts = products.filter(product =>
        (product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.ProductID.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategory === 'All' || product.ProductCategoryName === selectedCategory)
    );

    return (
        <Modal
            visible
            title="Chọn sản phẩm cho khuyến mãi"
            onCancel={onClose}
            footer={null}
            width={1000}
        >
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }} className="sticky-row">
                <Col span={10}>
                    <Input
                        placeholder="Tìm kiếm sản phẩm bằng tên hoặc mã"
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col span={6}>
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Filter by category"
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(value)}
                    >
                        <Option value="All">Tất cả</Option>
                        <Option value="Sữa cho mẹ bầu">Sữa cho mẹ bầu</Option>
                        <Option value="Sữa cho em bé">Sữa cho em bé</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Checkbox
                        checked={selectedProducts.length === products.length}
                        onChange={handleSelectAll}
                    >
                        Chọn tất cả
                    </Checkbox>
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={handleSave} block>Lưu</Button>
                </Col>
            </Row>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={filteredProducts}
                renderItem={item => (
                    <List.Item>
                        <div className='pro-prom-list-thinh'>
                            <Card
                                cover={<img alt={item.ProductName} src={item.Image} />}
                                actions={[
                                    <Checkbox
                                        checked={selectedProducts.includes(item.ProductID)}
                                        onChange={() => handleCheckboxChange(item.ProductID)}
                                    >
                                        Select
                                    </Checkbox>
                                ]}
                            >

                                <Tooltip title={item.ProductName}>
                                    <Card.Meta
                                        title={item.ProductName}
                                        description={
                                            <>
                                                <p><strong>Giá: </strong> {item.Price}</p>
                                                <p><strong>Kho: </strong> {item.StockQuantity}</p>
                                                <p>
                                                    <strong>HSD: </strong>
                                                    {new Date(item.ExpirationDate).toLocaleDateString("vi-VN", {
                                                        day: "2-digit",
                                                        month: "2-digit",
                                                        year: "numeric",
                                                    })}
                                                </p>
                                            </>
                                        }
                                    />
                                </Tooltip>

                            </Card>
                        </div>
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default ProductSelectionModal;
