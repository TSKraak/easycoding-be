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

module.exports = router;
