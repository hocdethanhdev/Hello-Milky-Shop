// module.exports = {
//     server: "localhost",
//     user: "sa",
//     password: "12345",
//     database: "HelloMilkyShop",
//     trustServerCertificate: true
// };
module.exports = {
    server: "hellomilkyshop.database.windows.net",
    authentication: {
        type: 'default',
        options: {
            userName: "hellomilkyshop",  // Tên người dùng
            password: "Hms123Swp"        // Mật khẩu
        }
    },
    options: {
        database: "hms",                // Tên cơ sở dữ liệu
        encrypt: true,                  // Mã hóa kết nối
        trustServerCertificate: false,  // Không tin tưởng chứng chỉ máy chủ
        hostNameInCertificate: '*.database.windows.net', // Tên máy chủ trong chứng chỉ
        loginTimeout: 30                // Thời gian chờ đăng nhập
    }
};
