const userService = require("../service/userService");

const updateUserAccount = async (req, res) => {
  try {
    const { UserID, UserName, Email, PhoneNumber } = req.body;
    if(!UserID) res.status(400).json({
      err: 1,
      message: 'Missing input'
    })
    let obj;
    if(UserName !== null){
      obj = await userService.updateUserName(UserID, UserName);
    }else if(Email !== null){
      obj = await userService.updateUserEmail(UserID, Email);
    }else if(PhoneNumber !== null){
      obj = await userService.updateUserPhoneNumber(UserID, PhoneNumber);
    }
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const usePoint = async (req, res) => {
  try {
    const { UserID } = req.body;
    if(!UserID) res.status(400).json({
      err: 1,
      message: 'Missing input'
    })
    const obj = await userService.usePoint(UserID);
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const countUserByRole = async (req, res) => {
  try {
    const RoleID = req.params.role;
    if(!RoleID) res.status(400).json({
      err: 1,
      message: 'Missing input'
    })
    const obj = await userService.countUserByRole(RoleID);
    res.status(200).json(obj)
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getUserByID = async (req, res) => {
  try {
    const UserID = req.query.UserID;
    if (!UserID) res.status(400).json({
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
    if (!currentUser) res.status(400).json({
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

const changePointOfUser = async (req, res) => {
  try {
    const { userID, minusPoint } = req.body;
    const obj = await userService.changePointOfUser(userID, minusPoint);
    res.send(obj);
  } catch (error) {
    console.error("Error in changePointOfUser controller:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
  getUserByRole,
  getOne,
  getUserByID,
  changePointOfUser,
  countUserByRole,
  usePoint,
  updateUserAccount,
};
