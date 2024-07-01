import React, { useState } from 'react';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import ProductSelectionModal from './ProductSelectionModal ';
import moment from 'moment';
import './EditProductModal.css';
const EditPromotionModal = ({ promotion, onClose, onSave }) => {
    const [form] = Form.useForm();
    const [productSelectionVisible, setProductSelectionVisible] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleSave = () => {
        form.validateFields().then(values => {
            const updatedPromotion = {
                ...values,
                PromotionID: promotion.PromotionID,
                startDate: values.startDate.format('YYYY-MM-DD'),
                endDate: values.endDate.format('YYYY-MM-DD')
            };
            onSave(updatedPromotion, selectedProducts);
        });
    };

    return (
        <Modal
            visible
            title="Edit Promotion"
            onCancel={onClose}
            onOk={handleSave}
        >
            <Form form={form} initialValues={{
                promotionName: promotion.PromotionName,
                description: promotion.Description,
                discountPercentage: promotion.DiscountPercentage,
                startDate: moment(promotion.StartDate),
                endDate: moment(promotion.EndDate)
            }}>
                <Form.Item name="promotionName" label="Promotion Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="discountPercentage" label="Discount Percentage" rules={[{ required: true, type: 'number', min: 0, max: 100 }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
                    <DatePicker />
                </Form.Item>
            </Form>
            <Button type="primary" onClick={() => setProductSelectionVisible(true)}>Chọn sản phẩm áp dụng khuyến mãi</Button>
            {productSelectionVisible && (
                <ProductSelectionModal
                    promotionID={promotion.PromotionID}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    onClose={() => setProductSelectionVisible(false)}
                />
            )}
        </Modal>
    );
};

export default EditPromotionModal;
