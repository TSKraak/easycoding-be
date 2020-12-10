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

router.put("/:requestId", authMiddleware, async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .send({ message: "Please provide a title and content" });
  }
  try {
    const updatedRequest = await Request.update(
      {
        title,
        content,
      },
      { where: { id: parseInt(req.params.requestId) } }
    );
    const returnRequest = await Request.findByPk(
      parseInt(req.params.requestId),
      {
        include: [
          { model: Comment, include: [{ model: Answer }] },
          { model: User, attributes: { exclude: ["password"] } },
        ],
      }
    );
    res.status(200).send(returnRequest);
  } catch (error) {
    next(error);
  }
});

router.delete("/:requestId", authMiddleware, async (req, res, next) => {
  try {
    await Request.destroy({
      where: {
        id: parseInt(req.params.requestId),
        userId: req.user.dataValues["id"],
      },
    });
    res
      .status(200)
      .send({ message: `Deleted request with id:${req.params.requestId}` });
  } catch (error) {
    next(error);
  }
});

router.delete("/admin/:requestId", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  if (admin === false) {
    return res
      .status(403)
      .send({ message: "You are not authorized to delete this request" });
  }
  try {
    await Request.destroy({
      where: {
        id: parseInt(req.params.requestId),
      },
    });
    res
      .status(200)
      .send({ message: `Deleted request with id:${req.params.requestId}` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
