const commentService = require("../service/commentService");

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
}
