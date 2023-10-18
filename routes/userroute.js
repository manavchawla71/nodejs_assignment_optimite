const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretkey = "manav_chawla";
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "Sign-up successful!" });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "password doesnt match" });
    }
    const token = jwt.sign({ username: user.username }, secretkey, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
