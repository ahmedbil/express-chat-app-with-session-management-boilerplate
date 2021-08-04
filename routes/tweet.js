const express = require('express');
const uniqid = require('uniqid');
const router = express.Router();
const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");

router.route("/add").post(async (req, res) => {
    const userID = req.body.id;
    const text = req.body.text;
    const tweetID  = uniqid();
    const user = await User.findOne({_id: userID});
  
    const newTweet= new User({
      userCreated: user,
      text: text,
      tweetID: tweetID
    });
      
    newTweet
      .save()
      .then(() => res.json("Tweeted"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  router.route("/update/:id").post(async (req, res) => {
    Tweet.findById(req.params.id)
      .then(async (tweet) => {
        if (req.body.text) {
          tweet.text = req.body.text;
        }
        if (req.body.tweetID) {
          tweet.tweetID = req.body.id;
        }
        if (req.body.email) {
          user.email = req.body.email;
        }
        console.log("info saved");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

  router.route("/delete/:id").delete((req, res) => {
    Tweet.findByIdAndDelete(req.params.id)
      .then(() => res.json("Tweet deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
module.exports = router;