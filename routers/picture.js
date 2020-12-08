const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Picture = require("../models/").picture;
const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const newPicture = await Picture.create({
      ...req.body,
    });
    res.status(200).send(newPicture);
  } catch (error) {
    next(error);
  }
});

router.put("/:postId", authMiddleware, async (req, res, next) => {
  try {
    const newPicture = await Picture.update(
      {
        postId: parseInt(req.params.postId),
      },
      { where: { ...req.body }, returning: true }
    );
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await Picture.destroy({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
