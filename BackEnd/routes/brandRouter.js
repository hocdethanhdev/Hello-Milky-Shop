const router = require('express').Router();

const brandController = require("../controller/brandController");

router.get('/getAll', brandController.getAll);
router.post('/addBrand', brandController.addBrand);

module.exports = router;