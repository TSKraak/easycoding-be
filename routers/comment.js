const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { comment: Comment, user: User, answer: Answer } = require("../models");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const { content, postId } = req.body;
  if (!content) {
    return res.status(400).send({ message: "Please provide a content" });
  }
  if (!postId) {
    return res.status(400).send({ message: "Post does not exist" });
  }
  try {
    const newComment = await Comment.create({
      content,
      postId,
      userId: req.user.dataValues["id"],
    });
    const returnComment = await Comment.findByPk(newComment.id, {
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        { model: Answer },
      ],
    });
    res.status(200).send(returnComment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
