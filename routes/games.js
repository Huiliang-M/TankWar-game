var express = require('express');
var router = express.Router();
const user_info=require('../modules/user_info.js');
const games=require('../modules/games.js');
const game_info=require('../modules/game_info.js');


//finduser,rendergame
router.get('/', function(req, res, next) {
	//console.log(req.baseUrl);
    var game_name = req.baseUrl.split("/")[2]
  //  console.log(req.user+" username "+game_name);
    games.find_game(game_name)
      .then(data=>{
            res.render('game',{game:data,user:req.user,login:true})
      })
      .catch(err => {
	        req.flash('error', 'The room is exist already');
	        res.redirect('/lobby');
	        console.log(err);
      })
});

router.post('/', function(req, res, next){
    var game_name = req.baseUrl.split("/")[2]
    //console.log(req.user.username+" username "+game_name);
    games.select_game_member(game_name)
      .then(data1=>{
           // console.log(data1[0].count+" data1");
            if(data1==2){
              req.flash('error_msg','The game is full');
              res.redirect('/lobby');
            }
           // console.log('post game info');
      })
      .then(data2=>{
            return games.update_game(game_name,2);
      })
      .then(data3=>{
           res.redirect('/games/'+game_name);
      })
});

module.exports = router;