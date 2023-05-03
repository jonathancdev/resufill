const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const tempUser = require("../tempUser");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};

const createTempToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3h" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    console.log("user is ", user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//signup user
const signupUser = async (req, res) => {
  const user_info = req.body;
  try {
    console.log("trying to create user");

    const user = await User.signup(user_info);
    console.log("user created");
    //create a token
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log("in user controller signup error");

    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No user found" });
  }
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "No user found" });
  }
  res.status(200).json(user);
};

//TEMPORARY ACCOUNT FUNCTIONS
//signup temp user
const signupTempUser = async (req, res) => {
  const { user_info } = tempUser;
  try {
    console.log("trying to create temp user");
    const user = await User.signupTemp(user_info);
    console.log("temp user created");

    //create a token

    const token = createTempToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.log("in user controller signup error");
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  deleteUser,
  signupTempUser,
};
