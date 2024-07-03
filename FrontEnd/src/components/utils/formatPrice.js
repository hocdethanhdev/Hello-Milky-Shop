export const formatPrice = (value) => {
    // Xóa các ký tự không phải số
    const numberValue = value.replace(/\D/g, '');
    // Thêm dấu chấm nghìn với locale 'vi-VN'
    const formattedValue = new Intl.NumberFormat('vi-VN').format(numberValue);
    // Thêm chữ "VND"
    return `${formattedValue}`;
};