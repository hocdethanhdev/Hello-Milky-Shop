const cron = require('node-cron');
const orderService = require('../service/orderService');

// Cấu hình công việc định kỳ mỗi 12 ngày lúc 00:00
cron.schedule('0 0 * * *', async () => {
    try {
        const days = 12;
        const oldStatus = 2;
        const newStatus = 3;
        await orderService.updateStatusAfterDays(days, oldStatus, newStatus);
        console.log('Order statuses updated successfully.');
    } catch (error) {
        console.error(`Error updating order statuses: ${error.message}`);
    }
});