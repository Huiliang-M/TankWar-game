var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const users = require('../modules/user_info.js');
const games=require('../modules/games.js');
const game_info=require('../modules/game_info.js');
const sockets=require('../socket/socket');
router.get('/',function(req,res){
    res.render('login');
});

router.get('/register',function(req,res){
 // console.log('register');
   res.render('register');
});

router.get('/logout',function(req,res){
  res.redirect('/');
});


router.get('/cancle',function(req,res){
   res.redirect('/');
});


router.post('/register', function(req, res,next){ 
  
  var email = req.body.Email;
  var username = req.body.UserName;
  var password = req.body.Password;
  var password2 = req.body.password2;
  // Validation
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email is not valid').isEmail();
  req.checkBody('UserName', 'Username is required').notEmpty();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.Password);

  var errors = req.validationErrors();

  if(errors){
    res.render('register',{
      errors:errors
    });
  } 
  else{
    users.findUser(username)
        .then(data=>{
          console.log(data+" find user");
              if(data){
                req.flash('error_msg', 'The username is exists');
                res.redirect('/register');
              }else{
                  bcrypt.hash(req.body.Password, 10)
                      .then(hash => {
                        users.insert_user(req.body.UserName,req.body.Email,hash)
                      })
                      .then(user => {
                        req.flash('success_msg', 'You are registered and can now login');
                        res.redirect('/');
                      })
                      .catch(err => {
                        res.redirect('/');
                      })
              }   
        }) 
    }
});

router.post('/lobby',passport.authenticate('local', {
    successRedirect: '/lobby',
    failureRedirect: '/',
    failureFlash: true
  })
);

router.get('/lobby',function(req,res){
 // console.log(req.user+" lobby");
  if(req.user){
    games.find_games()
        .then(data => {
    //console.log(req.user.username+" "+req.user.password);
          res.render('index', {
            message: req.flash('error'),
            user: req.user,
            games: data,
            login:true
          })
        })
    }else{
        req.flash('error_msg',"Wrong password or username");
        res.redirect('/');
    }
})

//insert game
router.post('/games',function(req,res,next){
 // console.log(req.body.game_name+" /games "+req.body.username);
  games.insert_game(req.body.game_name,req.body.username,1)
        .then(data =>{
            if(!data){
              req.flash('error_msg',"The game name already exist");
              res.redirect('/lobby');
            }
          //  console.log(data.game_name+"  "+req.user.username);
        })
        .then(data2=>{
             res.redirect('/games/'+req.body.game_name);
        })
        .catch((error) => {
              req.flash('error', 'An internal error has occured')
              res.redirect('/lobby')
              console.log(err);
        });
});

module.exports = router;