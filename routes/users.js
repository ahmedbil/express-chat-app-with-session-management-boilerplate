const express = require('express');
const router = express.Router();
const Bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken"); 
const authJs = require("../middleware/auth.js");
const authenticateToken = authJs.authenticateToken;
const deleteToken = authJs.deleteToken;


global.refreshTokens = [];
async function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
}

//API for Registering Users
router.route("/add").post(async (req, res) => {
  const salt = 10;
  const username = req.body.username;
  const password = await Bcrypt.hash(req.body.password, salt);
  const email = req.body.email;

  const newUser = new User({
    username,
    password,
    email,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


//API for Logging Users and Creating JWT Tokens
router.route("/login").post(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    console.log("user not found");
    return res.status(400).send("Cannot find user");
  }

  try {
    const isMatch = await Bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      console.log(user);
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = { user: { id: user.id } };
    const token = await generateAccessToken(payload);
    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET);
    console.log(token);
    refreshTokens.push(refreshToken);
    res.cookie('refreshtoken',refreshToken,{ sameSite:'strict',
      path: '/',
      httpOnly: true });
    res.json({user, token});
  } catch(err) {
    console.log("exception",err)
    res.status(500).send();
  }
});

module.exports = router;