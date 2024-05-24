const userController = require('../controllers/user')

const router = require('express').Router()

router.get('/getUsers', userController.getUsers)

router.get('/getUserByID/:id', userController.getUserByID)

router.get('/getUserByRole/:id', userController.getUserByRole)

router.post('/registerByPhone', userController.registerByPhone);

module.exports = router