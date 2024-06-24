const commentService = require("../service/commentService");

const getCommentByID = async (req, res) => {
  try {
    const { CommentID } = req.body;
    if (!CommentID) {
      res.status(404).send({
        err: 1,
        message: "Missing input",
      });
    }
    const obj = await commentService.getCommentByID(CommentID);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const countRatingAndAvgRating = async (req, res) => {
  try {
    const ProductID = req.params.id;
    if (!ProductID) {
      res.status(404).send({
        err: 1,
        message: "Missing input",
      });
    }
    const obj = await commentService.countRatingAndAvgRating(ProductID);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getCommentByProductID = async (req, res) => {
  try {
    const ProductID = req.params.id;
    if (!ProductID) {
      res.status(404).send({
        err: 1,
        message: "Missing input",
      });
    }
    const obj = await commentService.getCommentByProductID(ProductID);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const userComment = async (req, res) => {
  try {
    const { UserID, ProductID, Rating, Description } = req.body;
    if (!UserID || !ProductID) {
      res.status(404).send({
        err: 1,
        message: "Missing input",
      });
    }
    const obj = await commentService.userComment(
      UserID,
      ProductID,
      Rating,
      Description
    );
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const checkUserOrdered = async (req, res) => {
  try {
    const { UserID, ProductID } = req.body;
    if (!UserID || !ProductID) {
      res.status(404).send({
        err: 1,
        message: "Missing input",
      });
    }
    const obj = await commentService.checkUserOrdered(UserID, ProductID);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllComments = async (req, res) => {
  try {
    const obj = await commentService.getAllComments();
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getUnansweredComments = async (req, res) => {
  try {
    const obj = await commentService.getUnansweredComments();
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const repComment = async (req, res) => {
  try {
    const obj = await commentService.repComment(req.params.id, req.body.Rep);
    res.send(obj);
  } catch (error) {
    console.error("Error while getting all users:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllComments,
  getUnansweredComments,
  repComment,
  checkUserOrdered,
  userComment,
  getCommentByProductID,
  countRatingAndAvgRating,
  getCommentByID,
};
