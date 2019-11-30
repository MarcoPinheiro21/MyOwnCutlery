var express = require("express");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var UserModel = require("../models/User");
var VerifyToken = require("../auth/VerifyToken");

var router = express.Router();

//role validation
router.get("/", VerifyToken, function(req, res) {
  hasRole(req.user, req.role, function(decision) {
    if (!decision)
      return res.status(403).send({
        auth: false,
        token: null,
        message: "You have no authorization."
      });
    else
      UserModel.find(function(err, users) {
        if (err) res.send(err);
        res.json(users);
      });
  });
});

//User registration
router.post("/register", function(req, res) {
  var user = new UserModel();
  user.name = req.body.name;
  user.password = bcrypt.hashSync(req.body.password, 8);
  user.email = req.body.email;
  user.role = "client";

  user.save(function(err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    const payload = { user: user.name };
    var theToken = jwt.sign(payload, "l@pr5com5", {
      expiresIn: 86400
    });
    res.json({
      user: user,
      success: true,
      token: theToken,
      message: "User registered!"
    });
  });
});

//Login
router.post("/login", function(req, res) {
  UserModel.findOne({ name: req.body.name }, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res
        .status(400)
        .send({ auth: false, token: null, message: "Username not found!" });
    } else if (user) {
      if (!bcrypt.compareSync(req.body.password, user.password))
        return res
          .status(401)
          .send({ auth: false, token: null, message: "Wrong password!" });
      else {
        const payload = { user: user.name };
        var theToken = jwt.sign(payload, "l@pr5com5", {
          expiresIn: 86400
        });
        res.json({
          success: true,
          message: "Enjoy your token!",
          token: theToken,
          user: user
        });
      }
    }
  });
});

function hasRole(username, role, func) {
  UserModel.findOne({ username: username }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: "Authentication failed." });
    } else if (user) {
      func(role === user.role);
    }
  });
}

module.exports = router;
