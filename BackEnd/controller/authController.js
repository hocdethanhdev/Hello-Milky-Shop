const authService = require("../service/authService");

const login = async (req, res) => {
    try {
        const obj = await authService.login(req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

let checkLoggedOut = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
};

const register = async (req, res) => {
    try {
        const obj = await authService.register(req.body);
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const logout = async (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/");
    });
};

module.exports = {
    checkLoggedOut,
    login,
    register,
    logout,
}
