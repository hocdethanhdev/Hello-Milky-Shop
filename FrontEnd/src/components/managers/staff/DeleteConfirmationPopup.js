
import React from 'react';
import { Modal, Button } from 'antd';

const DeleteConfirmationPopup = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            title="Xác nhận xóa"
            visible={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Không
                </Button>,
                <Button key="submit" type="primary" onClick={onConfirm}>
                    Có
                </Button>,
            ]}
        >
            <p>Bạn có chắc muốn xóa sản phẩm này không?</p>
        </Modal>
    );
};

export default DeleteConfirmationPopup;
