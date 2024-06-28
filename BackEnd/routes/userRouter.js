const router = require('express').Router();
const userController = require("../controller/userController");
const verifyToken = require('../middleware/verifyToken')

router.get('/getAllUsers', userController.getAllUsers);

router.put('/disableUser/:user_id', userController.deleteUser);

router.put('/editUser/:user_id', userController.updateUser);

router.get('/getUserByRoleID/:ID', userController.getUserByRole);

router.get('/getOne', verifyToken, userController.getOne);

router.get('/getUserByID', userController.getUserByID);

router.post('/changePointOfUser', userController.changePointOfUser);

router.get('/countUserByRole/:role', userController.countUserByRole);

router.put('/usePoint', userController.usePoint);

router.put('/updateUserAccount', userController.updateUserAccount);

module.exports = router