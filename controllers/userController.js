const User = require('../models/userModel');
const argon2 = require('argon2');
const jwt  = require('jsonwebtoken');
const secret = require('../secret');
const passport = require('passport');

exports.createUser = async function (req, res) {
  try {
    const hash = await argon2.hash(req.body.password);
    let user = new User( {
      email: req.body.email,
      password: hash,
      isAdmin: req.body.isAdmin,
      isActive: req.body.isActive,
    });

    user.save(function(err, user) {
      if (err) {
        res.send("can't save user - " + err);
      }
      else {
        res.send(user)
      }
    })
  } catch (err) {
    res.send("can't hash/get password - " + err);
  }
};

exports.login = function(req, res, next){
  user = req.user;
  if (!user.isActive) {
    res.send({message: "user is inactive"})
  }
  else {
    const token = jwt.sign(user.toJSON(), secret.JWT_SECRET, {expiresIn: '45m'})
    const {iat, exp} = jwt.decode(token);
    res.send({iat, exp, token});
  }
}

exports.loginError = function(req, res, next){
  res.send({message: "email or password is wrong"});
}

exports.toggleAdmin = function(req, res){
  let id = req.params.id;
  User.findOne({_id: id}, function(err, user) {
    if(err) {
      res.send("can't find user - " + err);
    }
    else {
      user.isAdmin = !user.isAdmin;
      user.save(function(err, toggledUser) {
        if (err) {
          res.send("can't save updated user - " + err);
        }
        else {
          res.send(toggledUser);
        }
      });
    }
  });
};

exports.toggleActive = function(req, res){
  let id = req.params.id;
  User.findOne({_id: id}, function(err, user) {
    if(err) {
      res.send("can't find user - " + err);
    }
    else {
      user.isActive = !user.isActive;
      user.save(function(err, toggledUser) {
        if (err) {
          res.send("can't save updated user - " + err);
        }
        else {
          res.send(toggledUser);
        }
      });
    }
  });
};