const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/User");

const generateToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  return jwt.sign(userForToken, process.env.SECRET);
};

const authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) return { isAuthenticated: false, reason: "invalid username" };

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) return { isAuthenticated: false, reason: "invalid password" };

  return { isAuthenticated: true, user };
};

loginRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const { isAuthenticated, user, reason } = await authenticateUser(username, password);
    if (!isAuthenticated) {
      return res.status(401).json({ msg: reason });
    }

    const token = generateToken(user);
    return res.status(200).json({ token, username: user.username, name: user.name });

  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = loginRouter;
