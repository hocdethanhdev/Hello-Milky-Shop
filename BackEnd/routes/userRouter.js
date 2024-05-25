const router = require('express').Router();

const userController = require("../controller/userController");
     
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router



