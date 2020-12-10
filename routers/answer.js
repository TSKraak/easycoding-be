const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { user: User, answer: Answer } = require("../models");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const { content, commentId } = req.body;
  if (!content) {
    return res.status(400).send({ message: "Please provide a content" });
  }
  if (!commentId) {
    return res.status(400).send({ message: "Comment does not exist" });
  }
  try {
    const newAnswer = await Answer.create({
      content,
      commentId,
      userId: req.user.dataValues["id"],
    });
    const returnAnswer = await Answer.findByPk(newAnswer.id, {
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    res.status(200).send(returnAnswer);
  } catch (error) {
    next(error);
  }
});

router.put("/:answerId", authMiddleware, async (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({ message: "Please provide a content" });
  }
  try {
    const updatedAnswer = await Answer.update(
      {
        content,
      },
      { where: { id: parseInt(req.params.answerId) } }
    );
    const returnAnswer = await Answer.findByPk(parseInt(req.params.answerId), {
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    res.status(200).send(returnAnswer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:answerId", authMiddleware, async (req, res, next) => {
  try {
    await Answer.destroy({
      where: {
        id: parseInt(req.params.answerId),
        userId: req.user.dataValues["id"],
      },
    });
    res
      .status(200)
      .send({ message: `Deleted reply with id:${req.params.answerId}` });
  } catch (error) {
    next(error);
  }
});

router.delete("/admin/:answerId", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  if (admin === false) {
    return res
      .status(403)
      .send({ message: "You are not authorized to delete this reply" });
  }
  try {
    await Answer.destroy({
      where: {
        id: parseInt(req.params.answerId),
      },
    });
    res
      .status(200)
      .send({ message: `Deleted reply with id:${req.params.answerId}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
