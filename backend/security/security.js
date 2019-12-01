const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const argon2 = require('argon2')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const secret = require('../secret')
const User = require('../models/userModel')

passport.use(
  new LocalStrategy({usernameField: 'email'}, (email, inputtedPassword, done) => {
    User.findOne({email: email}, async function(err, user) {
      if (err) {
        console.log("can't find user - " + err);
        return done(null, false);
      }
      else {
        if (!user) {
          console.log(err);
          return done(null, false);
        }
        else {
          if (await argon2.verify(user.password, inputtedPassword)) {
            return done(null, user);
          } else {
            console.log("wrong password");
            return done(null, false);
          }
        }
      }
    })
  })
  );

passport.use(new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret.JWT_SECRET },
  function(payload, done) {
    User.findOne({email: payload.email}, function(err, user) {
      if(err) {
        console.log(err);
        return done(null, false);
      }
      else{
        return done(null, user);
      }
    })
  }));
