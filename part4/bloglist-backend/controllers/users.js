const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

const createUser = async (username, name, password) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return new User({ username, name, passwordHash }).save();
};

const validateUserInput = (username, password) => {
  if (!username || !password) {
    return { isValid: false, reason: "Username or Password missing" };
  } else if (username.length < 4 || password.length < 4) {
    return { isValid: false, reason: "Username or Password must have more than 3 characters" };
  }
  return { isValid: true };
};

usersRouter.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const { isValid, reason } = validateUserInput(username, password);
    if (!isValid) {
      return res.status(400).json({ msg: reason });
    }

    const savedUser = await createUser(username, name, password);
    return res.status(200).json(savedUser);

  } catch (error) {
    return res.status(400).json({ msg: "Cannot create user" });
  }
});

module.exports = usersRouter;
