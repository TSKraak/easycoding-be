const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { comment: Comment, user: User, answer: Answer } = require("../models");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const { content, postId, requestId } = req.body;
  if (!content) {
    return res.status(400).send({ message: "Please provide a content" });
  }
  try {
    if (postId) {
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
    } else {
      const newComment = await Comment.create({
        content,
        requestId,
        userId: req.user.dataValues["id"],
      });
      const returnComment = await Comment.findByPk(newComment.id, {
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          { model: Answer },
        ],
      });
      res.status(200).send(returnComment);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
