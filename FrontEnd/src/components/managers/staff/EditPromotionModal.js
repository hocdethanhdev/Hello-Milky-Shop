import React, { useState } from 'react';
import { Modal, Button, Form, Input, DatePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ProductSelectionModal from './ProductSelectionModal ';
import moment from 'moment';
import './EditProductModal.css';
import { uploadImage } from '../uimg/UpImage';

const EditPromotionModal = ({ promotion, onClose, onSave }) => {
    const [form] = Form.useForm();
    const [productSelectionVisible, setProductSelectionVisible] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [previewImage, setPreviewImage] = useState(promotion.Image || null);
    const [progress, setProgress] = useState(0);

    const handleSave = () => {
        form.validateFields().then(values => {
            const updatedPromotion = {
                ...values,
                PromotionID: promotion.PromotionID,
                startDate: values.startDate.format('YYYY-MM-DD'),
                endDate: values.endDate.format('YYYY-MM-DD'),
                image: previewImage,
            };
            onSave(updatedPromotion, selectedProducts);
        });
    };

    const handleImageChange = async (info) => {
        const imageFile = info.file.originFileObj;
        if (imageFile) {
            try {
                const imageUrl = await uploadImage(imageFile, setProgress);
                setPreviewImage(imageUrl);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    return (
        <Modal
            visible
            title="Edit Promotion"
            onCancel={onClose}
            onOk={handleSave}
        >
            <Form
                form={form}
                initialValues={{
                    promotionName: promotion.PromotionName,
                    description: promotion.Description,
                    discountPercentage: promotion.DiscountPercentage,
                    startDate: moment(promotion.StartDate),
                    endDate: moment(promotion.EndDate),
                }}
            >
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
                <Form.Item label="Image">
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        customRequest={({ onSuccess }) => onSuccess("ok")}
                        onChange={handleImageChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    {previewImage && (
                        <img src={previewImage} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
                    )}
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
