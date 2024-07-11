const cron = require('node-cron');
const promotionService = require('../service/promotionService');

// Cấu hình công việc định kỳ mỗi ngày lúc 00:00
cron.schedule('0 0 * * *', async () => {
    try {
        const oldStatus = 1;
        const newStatus = 0;
        await promotionService.updatePromotionStatusAuto(oldStatus, newStatus);
    } catch (error) {
        console.error(`Error updating voucher statuses: ${error.message}`);
    }
});