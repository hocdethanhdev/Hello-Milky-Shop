const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) res.status(401).json({
        err: 1,
        message: 'Chưa đăng nhập'
    })
    jwt.verify(token, 'HelloMilkyShop', (err, decode) => {
        if (err) res.status(401).json({
            err: 1,
            message: "Token không hợp lệ"
        })
        req.currentUser = decode
        next()
    })
}

module.exports = verifyToken;