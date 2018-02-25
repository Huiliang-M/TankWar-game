const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const users = require('../modules/user_info.js')

const init = () => {

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    users.findByIdPassport(id, function(err, user) {
      if (err) { 
        return cb(err);
      }
      cb(null, user);
    })
  })

  passport.use(new LocalStrategy(
    function(username, password, cb) {
          users.findByUsername(username, function (err, user) {
          if (err) {
            return cb(err);
          }
          if (!user) {
            return cb(null, false, { message: 'Incorrect username' });
          }
          
          bcrypt.compare(password, user.password, function(err, res) {
            if(res == false){
              console.log("false")
              return cb(null, false, { message: 'Incorrect password' });
            }
            else{
                console.log(password+" return user " +user.password);
                return cb(null, user);
            }
          })
        
        })
    }));
};

module.exports = { init };