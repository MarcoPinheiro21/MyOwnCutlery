var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  "User",
  new Schema({
    name: {
      type: String,
      validate: {
        isAsync: true,
        validator: function(value, isValid) {
          const self = this;
          return self.constructor
            .findOne({ name: value })
            .exec(function(err, user) {
              if (err) {
                throw err;
              } else if (user) {
                if (self.id === user.id) {
                  return isValid(true);
                }
                return isValid(false);
              } else {
                return isValid(true);
              }
            });
        },
        message: "The username is already taken!"
      }
    },
    password: String,
    email: {
      type: String,
      validate: {
        isAsync: true,
        validator: function(value, isValid) {
          const self = this;
          return self.constructor
            .findOne({ email: value })
            .exec(function(err, user) {
              if (err) {
                throw err;
              } else if (user) {
                if (self.id === user.id) {
                  return isValid(true);
                }
                return isValid(false);
              } else {
                return isValid(true);
              }
            });
        },
        message: "The email is already taken!"
      }
    },
    role: String
  })
);
