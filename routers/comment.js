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

router.put("/:commentId", authMiddleware, async (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({ message: "Please provide a content" });
  }
  try {
    const updatedComment = await Comment.update(
      {
        content,
      },
      { where: { id: parseInt(req.params.commentId) } }
    );
    const returnComment = await Comment.findByPk(
      parseInt(req.params.commentId),
      {
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          {
            model: Answer,
            include: [
              {
                model: User,
                attributes: { exclude: ["password"] },
              },
            ],
          },
        ],
      }
    );
    res.status(200).send(returnComment);
  } catch (error) {
    next(error);
  }
});

router.delete("/:commentId", authMiddleware, async (req, res, next) => {
  try {
    await Comment.destroy({
      where: {
        id: parseInt(req.params.commentId),
        userId: req.user.dataValues["id"],
      },
    });

    await Answer.destroy({
      where: {
        commentId: null,
      },
    });

    res
      .status(200)
      .send({ message: `Deleted comment with id:${req.params.commentId}` });
  } catch (error) {
    next(error);
  }
});

router.delete("/admin/:commentId", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  if (admin === false) {
    return res
      .status(403)
      .send({ message: "You are not authorized to delete this comment" });
  }
  try {
    await Comment.destroy({
      where: {
        id: parseInt(req.params.commentId),
      },
    });

    await Answer.destroy({
      where: {
        commentId: null,
      },
    });

    res
      .status(200)
      .send({ message: `Deleted comment with id:${req.params.commentId}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
