const cron = require('node-cron');
const voucherService = require('../service/voucherService');

// Cấu hình công việc định kỳ mỗi ngày lúc 00:00
cron.schedule('0 0 * * *', async () => {
    try {
        const oldStatus = 1;
        const newStatus = 0;
        await voucherService.updateVoucherStatusAndRemoveFromUser(oldStatus, newStatus);
        console.log('Voucher statuses updated successfully.');
    } catch (error) {
        console.error(`Error updating voucher statuses: ${error.message}`);
    }
});