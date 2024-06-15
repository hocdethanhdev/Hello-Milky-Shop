const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] || req.body.token || req.query.token;
    if (!token) res.status(401).json({
        err: 1,
        message: 'Chưa đăng nhập'
    })
    jwt.verify(token, 'HelloMilkyShop', { ignoreExpiration: true }, (err, decode) => {

        if (err) res.status(401).json({
            err: 1,
            message: "Token không hợp lệ"
        })
        req.currentUser = decode
        next()
    })
}

module.exports = verifyToken;