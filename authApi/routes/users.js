var express = require("express");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var UserModel = require("../models/User");
var VerifyToken = require("../auth/VerifyToken");

var router = express.Router();

//role validation
router.get("/", function(req, res) {
  var token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, "l@pr5com5", function(err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    UserModel.findOne({ name: decoded.user }, function(err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        return res
          .status(400)
          .send({ auth: false, token: null, message: "Username not found with that token!" });
      } else if (user) {
        res.json({
          role: user.role
        });
      }
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

module.exports = router;
