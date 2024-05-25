module.exports = app => {
    const userController = require("../controller/userController");

    
  
    app.get('/', (req, res) => {
        res.send('Server on')
    })
  };