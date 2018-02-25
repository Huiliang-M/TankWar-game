const db = require('./index');
const insert_user='INSERT INTO game_info(game_name,prepare,user_name) VALUES($1,$2,$3) RETURNING *'
const select_game="select count(*) as count from game_info where game_name=$1"
const update="update game_info set prepare=$1 where user_name=$2 "
const select_prepare="select count(*) as count from game_info where game_name=$1 and prepare=$2"
const reset="update game_info set prepare=$1 where game_name=$2"
module.exports={
	insert_user:function(game_name,prepare,user_name){
		console.log("game info  "+game_name+" "+prepare+" "+user_name);
		return db.one(insert_user,[game_name,prepare,user_name]);
	},

	select_game:function(game_name){
		return db.any(select_game,game_name);
	},

	update:function(current_user,prepare){
        return db.one(update,[prepare,current_user]);
	},

	select_prepare: function(game_name,prepare){
		return db.any(select_prepare,[game_name,prepare]);
	},

	reset:function(prepare,game_name){
		return db.any(reset,[prepare,game_name]);
	}

} 