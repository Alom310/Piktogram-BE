const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  index: (req, res) => {
    db.User.find({}, (err, foundUsers) => {
      if (err) return console.error(err);
      res.json(foundUsers);
    });
  },
  show: (req, res) => {
    if (req.userId) {
      db.User.findById(req.userId, (foundUser) => {
          res.json(foundUser);
        })
        .populate("post");
    } else {
      res.json("No user id provided");
    }
  },
  signup: (req, res) => {
    console.log(req.body);

    db.User.find({
        email: req.body.email
      })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "That email already exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              console.log("Hashing error:", err);
              res.status(200).json({
                error: err
              });
            } else {
              db.User.create({
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  username: req.body.username,
                  password: hash
                },
                (err, newUser) => {
                  console.log(newUser);
                  let user = {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    username: newUser.username,
                    _id: newUser._id
                  };
                  jwt.sign(
                    user,
                    "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=", {
                      expiresIn: "1h"
                    },
                    (err, signedJwt) => {
                      res.status(200).json({
                        message: "User created",
                        user,
                        signedJwt
                      });
                    }
                  );
                }
              );
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          err
        });
      });
  },
  login: (req, res) => {
    console.log("Login called");
    console.log(req.body);
    db.User.find({
        email: req.body.email
      })
      .select("+password")
      .exec()
      .then(users => {
        if (users.length < 1) {
          return res.status(401).json({
            message: "Your email or password is incorrect."
          });
        }
        console.log(users[0]);

        bcrypt.compare(req.body.password, users[0].password, (err, match) => {
          console.log("checking password");
          if (err) {
            console.log(err);
            return status(500).json({
              err
            });
          }
          if (match) {
            console.log("matched");
            let user = {
              firstName: users[0].firstName,
              lastName: users[0].lastName,
              email: users[0].email,
              username: users[0].username,
              _id: users[0]._id
            };
            jwt.sign(
              user,
              "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=", {
                expiresIn: "1h"
              },
              (err, signedJwt) => {
                res.status(200).json({
                  message: "Auth Successful",
                  user,
                  signedJwt
                });
              }
            );
          } else {
            console.log("no match");
            res.status(401).json({
              message: "Your email or password is incorrect."
            });
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          err
        });
      });
  },
  delete: (req, res) => {
    console.log(req.body);
    let userId = req.body._id;
    db.User.findOneAndDelete({
      _id: userId
    }, (err, foundUser) => {
      if (err) {
        throw err;
      }
      res.json(foundUser);
    });
  },
  update: (req, res) => {
    let userId = req.params.id;

    console.log(userId);

    db.User.findOneAndUpdate({
        _id: userId
      },
      req.body, {
        new: true
      },
      (err, updatedUser) => {
        if (err) return console.log(err);
        console.log(updatedUser);
        res.json(updatedUser);
      }
    );
  },
  search: (req, res) => {
    let query = req.query.s;
    let pattern = new RegExp(query, "i");
    // db.User.find({ $text: { $search: query } }).exec((err, data) => {
    //   if (err) { res.json({ message: err }) }
    //   else {
    //     res.json(data);
    //   }
    // })

    db.User.find({ username: { $regex: pattern } }).exec((err, data) => {
      if (err) { res.json({ message: err }) }
      else {
        res.json(data);
      }
    })
  }
};