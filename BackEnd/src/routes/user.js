const userController = require('../controllers/user')

const router = require('express').Router()

router.get('/getUsers', userController.getUsers)

router.post('/registerByPhone', userController.registerByPhone);

module.exports = router