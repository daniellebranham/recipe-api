const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/models");

const parser = bodyParser.json();
const router = express.Router();

router.use(parser);

router.get("/", (req, res) => {
  try {
    User.find({}, (err, users) => {
      res.json(users);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      res.json(user);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id", (req, res) => {
  try {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
      err,
      user
    ) {
      res.status(200).send(user);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", (req, res) => {
  try {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      res.status(200).send("success");
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/addUser", (req, res) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      passWord: req.body.passWord
    });
    newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
