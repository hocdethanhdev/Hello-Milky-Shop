const router = require('express').Router();

const userController = require("../controller/userController");
     
router.get('/getAllUsers', userController.getAllUsers);

router.put('/disableUser/:user_id', userController.deleteUser);

router.put('/editUser/:user_id', userController.updateUser);

router.get('/getUserByRoleID/:ID', userController.getUserByRole);


module.exports = router