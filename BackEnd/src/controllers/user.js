const { User } = require('../models');
const { sequelize } = require('../models');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error while fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const registerByPhone = async (req, res) => {
  const { username, phonenumber, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // Kiểm tra người dùng đã tồn tại trong db
    const existingUser = await User.findOne({ where: { phonenumber: phonenumber } });
    if (existingUser) {
      return res.status(400).json({ message: 'Số điện thoại đã được sử dụng.' });
    }
    const userid = generateRandomString();

    // Tạo
    await sequelize.query(`
      INSERT INTO Users (UserID, UserName, PhoneNumber, Password )
      VALUES (:userid ,:username, :phonenumber, :hashedPassword)
    `, {
      replacements: { userid, username, phonenumber, hashedPassword },
      type: sequelize.QueryTypes.INSERT
    });

    // thành công
    res.status(201).json({ message: 'Đăng kí thành công.'});
  } catch (error) {
    console.error('Đăng kí thất bại:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng kí.' });
  }
};

module.exports = {
  getUsers,
  registerByPhone
}