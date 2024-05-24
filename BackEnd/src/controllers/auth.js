const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;

    // Tìm người dùng bằng số điện thoại
    const user = await User.findOne({ where: { PhoneNumber: phonenumber } });

    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    // So sánh mật khẩu được nhập với mật khẩu trong cơ sở dữ liệu
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    // Tạo mã thông báo JWT
    const token = jwt.sign({ id: user.UserID }, 'HelloMilkyShop', { expiresIn: '1h' });

    res.json({ 
      mes: "Đăng nhập thành công",
      token 
    });
  } catch (error) {
    console.error('Đã xảy ra lỗi khi đăng nhập:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập' });
  }
};

module.exports = {
  login,
};
