const userService = require("../service/userService");

const getUserByID = async (req, res) => {
  try {
    const UserID = req.query.UserID;
    console.log(UserID);
    if(!UserID) res.status(400).json({
      err: 1,
      message: 'Missing input'
    })
    const obj = await userService.getUserByID(UserID);
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getOne = async (req, res) => {
  try {
    const { currentUser } = req;
    if(!currentUser) res.status(400).json({
      err: 1,
      message: 'Missing input'
    })
    const obj = await userService.getOne(currentUser.id);
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const obj = await userService.getAllUsers();
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const obj = await userService.deleteUser(req.params.user_id);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;
    const obj = await userService.updateUser(req.params.user_id, user);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getUserByRole = async (req, res) => {
  try {
    const obj = await userService.getUserByRole(req.params.ID);
    res.send(obj);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
  getUserByRole,
  getOne,
  getUserByID,
};
