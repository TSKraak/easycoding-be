const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const {
  request: Request,
  comment: Comment,
  answer: Answer,
  user: User,
} = require("../models");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await Request.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Comment,
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Answer,
              order: [["createdAt", "DESC"]],
              include: [
                {
                  model: User,
                  attributes: { exclude: ["password"] },
                },
              ],
            },
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .send({ message: "Please provide a title and content" });
  }
  try {
    const newRequest = await Request.create({
      title,
      content,
      userId: req.user.dataValues["id"],
    });
    const returnRequest = await Request.findByPk(newRequest.id, {
      include: [
        { model: Comment, include: [{ model: Answer }] },
        { model: User, attributes: { exclude: ["password"] } },
      ],
    });
    res.status(200).send(returnRequest);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
