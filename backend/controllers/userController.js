const User = require('../models/userModel');
const argon2 = require('argon2');
const jwt  = require('jsonwebtoken');
const secret = require('../secret');
const passport = require('passport');

exports.all = function(req, res) {
  User.find({}, function(err, users) {
    if(err) {
      res.send({ error: err })
    }
    else {
      res.send(users);
    }
  });
}

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
        console.log(err);
        res.send({ error: "can't save user" });
      }
      else {
        const token = jwt.sign(user.toJSON(), secret.JWT_SECRET, { expiresIn: '45m' });
        const {iat, exp} = jwt.decode(token);
        res.send({ iat, exp, token });
      }
    })
  } catch (err) {
    res.send({ error: "can't hash/get password"});
  }
};

exports.login = function(req, res){
  user = req.user;
  if (!user.isActive) {
    res.send({ error: "user is inactive" })
  }
  else {
    const token = jwt.sign(user.toJSON(), secret.JWT_SECRET, { expiresIn: '45m' });
    const {iat, exp} = jwt.decode(token);
    res.send({ iat, exp, token });
  }
}

exports.loginError = function(req, res){
  res.send({error: "email or password is wrong"});
}

exports.toggleAdmin = function(req, res){
  let id = req.params.id;
  User.findOne({_id: id}, function(err, user) {
    if(err) {
      res.send({ error: err });
    }
    else {
      user.isAdmin = !user.isAdmin;
      user.save(function(err, toggledUser) {
        if (err) {
          res.send({ error: err });
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
      res.send({ error: err });
    }
    else {
      user.isActive = !user.isActive;
      user.save(function(err, toggledUser) {
        if (err) {
          res.send({ error: err });
        }
        else {
          res.send(toggledUser);
        }
      });
    }
  });
};