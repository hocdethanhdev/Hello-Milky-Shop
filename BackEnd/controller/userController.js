const userService = require("../service/userService");

const getAllUsers = async (req, res) => {
    try {
        const obj = await userService.getAllUsers();
        res.send(obj);
    } catch (error) {
        console.error("Error while getting all users:", error);
        res.status(500).send("Internal Server Error");
    }
};

const deleteUser = async (req, res) => {
    try {
      const obj = await userService.deleteUser(req.params.user_id);
      res.send(obj);
    } catch (error) {
      console.error("Error while getting all users:", error);
      res.status(500).send("Internal Server Error");
    }
  };


  const updateUser = async (req, res) => {
  try {
    const user = req.body;
    const obj = await userService.updateUser(req.params.user_id, user);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserByRoleID = async (req, res) => {
  try {
      const obj = await userService.getUserByRoleID(req.params.ID);
      res.send(obj);
  } catch (error) {
      console.error("Error while getting all users:", error);
      res.status(500).send("Internal Server Error");
  }
};
module.exports = {
    getAllUsers,
    deleteUser,
    updateUser,
    getUserByRoleID
}