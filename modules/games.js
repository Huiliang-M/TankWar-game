const db = require('./index');
const find_different_games="select distinct(s.game_name),s.game_member from games s"
const insert_game='INSERT INTO games(game_name,user_name,game_member) VALUES($1,$2,$3) RETURNING *'
const isUserInGame="select * from games s where s.user_name=$1 "
const find_game="select * from games where game_name=$1"
const update_game=' update games set game_member=$2 where game_name=$1 returning * '
const select_game_member='select game_member from games where game_name=$1'

module.exports = {
  find_games: function() {
    return db.any( find_different_games )
  },
  insert_game:function(game_name, username,game_member){
  	//console.log(game_name+"  "+user_name);
  	return db.one(insert_game,[game_name,username,game_member]);
  },

  isUserInGame:function(user_name){
  	return db.one(isUserInGame,[user_name]);
  },

  find_game:function(game_name){
  	return db.one(find_game,[game_name]);
  },

  update_game:function(game_name,game_member){
    return db.one(update_game,[game_name,game_member]);
  },
  
  select_game_member:function(game_name){
     return db.any(select_game_member,game_name);
  }
}
