const { Router } = require("express");
const User = require("../models/").user;
const authMiddleware = require("../auth/middleware");

const router = new Router();

router.post("/", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  try {
    if (admin === false) {
      return res
        .status(403)
        .send({ message: "You are not authorized to see all users" });
    }
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({
      users,
      message: "Admin Found. You are authorized to see all users",
    });
  } catch (e) {
    next(e);
  }
});

router.put("/", authMiddleware, async (req, res, next) => {
  const { name, email, picture } = req.body;
  try {
    const updatedUser = await User.update(
      {
        name,
        email,
        picture,
      },
      { where: { id: req.user.dataValues["id"], return: true } }
    );
    const returnUser = await User.findOne({
      where: updatedUser,
      attributes: { exclude: ["password"] },
    });
    res.status(200).json({ returnUser });
  } catch (e) {
    next(e);
  }
});

router.put("/block/:id", authMiddleware, async (req, res, next) => {
  const admin = req.user.dataValues.isAdmin;
  try {
    if (admin === false) {
      return res
        .status(403)
        .send({ message: "You are not authorized to block users" });
    }
    const user = await User.findByPk(parseInt(req.params.id));
    await user.update({
      accountBlocked: !user.accountBlocked ? true : false,
    });
    res.status(200).json({
      user,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
